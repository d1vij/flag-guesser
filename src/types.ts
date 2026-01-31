
export type ImagePixelData = [number, number, number][][];

export type FlagBuffers = Record<string, ImagePixelData>;

export type ImageGuesserOptions = {
    dimensions: {
        height: number,
        width: number
    }
    
    threshold: number,
}
