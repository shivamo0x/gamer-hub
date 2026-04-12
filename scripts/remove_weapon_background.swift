import AppKit
import CoreGraphics
import Foundation
import ImageIO
import UniformTypeIdentifiers

struct RGBA {
  let r: UInt8
  let g: UInt8
  let b: UInt8
  let a: UInt8

  var luminance: Double {
    (0.2126 * Double(r)) + (0.7152 * Double(g)) + (0.0722 * Double(b))
  }

  var chroma: Int {
    let maxValue = max(Int(r), Int(g), Int(b))
    let minValue = min(Int(r), Int(g), Int(b))
    return maxValue - minValue
  }
}

func loadImage(at url: URL) -> CGImage? {
  guard let source = CGImageSourceCreateWithURL(url as CFURL, nil) else {
    return nil
  }

  return CGImageSourceCreateImageAtIndex(source, 0, nil)
}

func savePNG(_ image: CGImage, to url: URL) throws {
  guard let destination = CGImageDestinationCreateWithURL(
    url as CFURL,
    UTType.png.identifier as CFString,
    1,
    nil
  ) else {
    throw NSError(domain: "remove-bg", code: 1, userInfo: [NSLocalizedDescriptionKey: "Could not create destination"])
  }

  CGImageDestinationAddImage(destination, image, nil)

  if !CGImageDestinationFinalize(destination) {
    throw NSError(domain: "remove-bg", code: 2, userInfo: [NSLocalizedDescriptionKey: "Could not finalize PNG"])
  }
}

func rgbaData(from image: CGImage) -> (data: [UInt8], width: Int, height: Int)? {
  let width = image.width
  let height = image.height
  let bytesPerPixel = 4
  let bytesPerRow = width * bytesPerPixel
  var data = [UInt8](repeating: 0, count: height * bytesPerRow)

  guard let colorSpace = CGColorSpace(name: CGColorSpace.sRGB) else {
    return nil
  }

  guard let context = CGContext(
    data: &data,
    width: width,
    height: height,
    bitsPerComponent: 8,
    bytesPerRow: bytesPerRow,
    space: colorSpace,
    bitmapInfo: CGImageAlphaInfo.premultipliedLast.rawValue
  ) else {
    return nil
  }

  context.draw(image, in: CGRect(x: 0, y: 0, width: width, height: height))
  return (data, width, height)
}

func makeImage(from data: [UInt8], width: Int, height: Int) -> CGImage? {
  let bytesPerPixel = 4
  let bytesPerRow = width * bytesPerPixel
  guard let provider = CGDataProvider(data: Data(data) as CFData) else {
    return nil
  }

  guard let colorSpace = CGColorSpace(name: CGColorSpace.sRGB) else {
    return nil
  }

  return CGImage(
    width: width,
    height: height,
    bitsPerComponent: 8,
    bitsPerPixel: 32,
    bytesPerRow: bytesPerRow,
    space: colorSpace,
    bitmapInfo: CGBitmapInfo(rawValue: CGImageAlphaInfo.premultipliedLast.rawValue),
    provider: provider,
    decode: nil,
    shouldInterpolate: true,
    intent: .defaultIntent
  )
}

func pixel(at index: Int, in data: [UInt8]) -> RGBA {
  RGBA(r: data[index], g: data[index + 1], b: data[index + 2], a: data[index + 3])
}

func matchesBackground(_ pixel: RGBA, lightBackground: Bool) -> Bool {
  if pixel.a == 0 {
    return true
  }

  if lightBackground {
    return pixel.luminance > 215 && pixel.chroma < 55
  }

  return pixel.luminance < 42
}

func softenEdges(_ data: inout [UInt8], width: Int, height: Int) {
  let bytesPerPixel = 4
  let original = data

  for y in 1..<(height - 1) {
    for x in 1..<(width - 1) {
      let index = ((y * width) + x) * bytesPerPixel
      let alpha = original[index + 3]

      if alpha == 0 {
        continue
      }

      var transparentNeighbors = 0

      for ny in (y - 1)...(y + 1) {
        for nx in (x - 1)...(x + 1) {
          if nx == x && ny == y {
            continue
          }

          let neighborIndex = ((ny * width) + nx) * bytesPerPixel
          if original[neighborIndex + 3] == 0 {
            transparentNeighbors += 1
          }
        }
      }

      if transparentNeighbors >= 5 {
        data[index + 3] = 180
      } else if transparentNeighbors >= 3 {
        data[index + 3] = min(alpha, 220)
      }
    }
  }
}

func removeBackground(from url: URL, to outputURL: URL) throws {
  guard let image = loadImage(at: url) else {
    throw NSError(domain: "remove-bg", code: 3, userInfo: [NSLocalizedDescriptionKey: "Could not load image \(url.path)"])
  }

  guard var imageData = rgbaData(from: image) else {
    throw NSError(domain: "remove-bg", code: 4, userInfo: [NSLocalizedDescriptionKey: "Could not decode image \(url.path)"])
  }

  let width = imageData.width
  let height = imageData.height
  let bytesPerPixel = 4
  let borderStep = max(1, min(width, height) / 24)

  var borderPixels: [RGBA] = []
  for x in stride(from: 0, to: width, by: borderStep) {
    let topIndex = x * bytesPerPixel
    let bottomIndex = (((height - 1) * width) + x) * bytesPerPixel
    borderPixels.append(pixel(at: topIndex, in: imageData.data))
    borderPixels.append(pixel(at: bottomIndex, in: imageData.data))
  }

  for y in stride(from: 0, to: height, by: borderStep) {
    let leftIndex = (y * width) * bytesPerPixel
    let rightIndex = ((y * width) + (width - 1)) * bytesPerPixel
    borderPixels.append(pixel(at: leftIndex, in: imageData.data))
    borderPixels.append(pixel(at: rightIndex, in: imageData.data))
  }

  let averageLuminance = borderPixels.map(\.luminance).reduce(0, +) / Double(max(borderPixels.count, 1))
  let lightBackground = averageLuminance >= 127

  var visited = [Bool](repeating: false, count: width * height)
  var queue: [(Int, Int)] = []

  func enqueueIfBackground(x: Int, y: Int) {
    let offset = ((y * width) + x) * bytesPerPixel
    if matchesBackground(pixel(at: offset, in: imageData.data), lightBackground: lightBackground) {
      queue.append((x, y))
    }
  }

  for x in 0..<width {
    enqueueIfBackground(x: x, y: 0)
    enqueueIfBackground(x: x, y: height - 1)
  }

  for y in 0..<height {
    enqueueIfBackground(x: 0, y: y)
    enqueueIfBackground(x: width - 1, y: y)
  }

  var queueIndex = 0
  let directions = [(1, 0), (-1, 0), (0, 1), (0, -1)]

  while queueIndex < queue.count {
    let (x, y) = queue[queueIndex]
    queueIndex += 1

    let position = (y * width) + x
    if visited[position] {
      continue
    }
    visited[position] = true

    let offset = position * bytesPerPixel
    let currentPixel = pixel(at: offset, in: imageData.data)
    if !matchesBackground(currentPixel, lightBackground: lightBackground) {
      continue
    }

    imageData.data[offset + 3] = 0

    for (dx, dy) in directions {
      let nx = x + dx
      let ny = y + dy
      if nx >= 0 && nx < width && ny >= 0 && ny < height {
        let nextPosition = (ny * width) + nx
        if !visited[nextPosition] {
          queue.append((nx, ny))
        }
      }
    }
  }

  softenEdges(&imageData.data, width: width, height: height)

  guard let outputImage = makeImage(from: imageData.data, width: width, height: height) else {
    throw NSError(domain: "remove-bg", code: 5, userInfo: [NSLocalizedDescriptionKey: "Could not encode output image"])
  }

  try savePNG(outputImage, to: outputURL)
}

let arguments = CommandLine.arguments.dropFirst()
guard arguments.count >= 2 else {
  fputs("Usage: remove_weapon_background.swift <input> <output> [<input> <output> ...]\n", stderr)
  exit(1)
}

if arguments.count % 2 != 0 {
  fputs("Expected input/output pairs.\n", stderr)
  exit(1)
}

do {
  var iterator = arguments.makeIterator()
  while let input = iterator.next(), let output = iterator.next() {
    try removeBackground(from: URL(fileURLWithPath: input), to: URL(fileURLWithPath: output))
    print("processed \(output)")
  }
} catch {
  fputs("\(error)\n", stderr)
  exit(1)
}
