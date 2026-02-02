# Algorithm

Heuristic algorithm to check if any two images / flags are similar to each other

## Defns

1. (pixel) Color distance threshold -> Maximum allowed 'distance' between any two colors
2. Minimum match count -> Minimum number of pixel pairs of the two images that should have their color distances within the threshold
3. DeltaE -> The "delta" or distance between any of colors in CIELAB colorspace
4. Pixel match count -> Total number of pixel pairs whose's distance is within the DeltaE threshold
5. Potential Match -> (name of) Current sample with the maximum number of potential matches
6. Potential Matches (array) -> Name of all the samples whose match count are equal AND higher than any indivisual sample's match count
7. Maximum Recursion count -> maximum times the current source buffer should be checked against an array of potential matches

## Overview

- Convert all the pixels of both the source buffer and sample buffers to CIELAB (simply _lab_) colorspace
- For each corresponding pixel of source and sample buffer, calculate their DeltaE using CIE (1976, 2000) color difference formula
- For each color pair, if the DeltaE is within the defined maximum threshold, increment the _pixel match count_
- If the DeltaE is within the defined maximum threshold, increment the pixel match count
- After processing all pixel pairs, if the pixel match count is under minimum match count, discard the sample as potential match.
- Otherwise, if the sample's match count is equal to the potential match's match count, append it to the _potential matchs array_
- Otherwise, if the current sample's match count is greater than the _potential match's_ match count, clear the potential matchs array and push current sample to it
- After all the samples are matched, and if
    - Potential matches array contains NO elements, return _undefined_
    - Potential matches array contains ONE element, return that as a _potential match_
    - Potential matches array contains more than one element, redo the above steps with a smaller threshold distance value until either
        - One potential match array is remaining
        - Maximum recursion count is reached, then return a random from the potential matches

## Depth

### Converting sRGB to LAB colorspace

#### LAB Colorspace

The Lab color space consists of three components

1. L\* (lightness): Represents the lightness of the color, ranging from 0(black) to 100(white)
2. a\* (Red-Green axis): Color positions between red and green, negative values represent green and positive red.
3. b\* (Blue-Yellow axis): Color positions between blue and yellow, negative indicated blue, and positive indicated yellow.

#### Why convert ??

The commonly used RGB color space is not perceptually uniform, which means equal changes in RGB values do not correspond to equal perceived changes in color. Moreover, RGB does not account for the lightness of the light source, which may influence the perception of the color by our eyes.

On the other hand, the _LAB_ colorspace is perceptually uniform as it separates the lightness (L*) from the color data (a* and b\*)

#### Algorithm

1. The conversion function accepts the RGB color as either a 3 element array _\[R G B\]_ or a 4 element array _\[R G B A\]_. The alpha value is ignored in the latter case.

Moreover, to reduce overhead, no runtime checks are done over the length or datatype of the array passed.

2. Applying gamma correction to get linear RGB values using the formula

$Color_{\text{linear}} = \begin{cases}\left(\frac{Color’ + 0.055}{1.055}\right)^{2.4} & \text{if } Color’ > 0.04045 \\\frac{Color’}{12.92} & \text{otherwise}\end{cases}$

where _Color'_ is the normalized color value

3. Conversion to XYZ color array

$\begin{pmatrix}X \\Y \\Z\end{pmatrix}=\begin{pmatrix}0.4124564 & 0.3575761 & 0.1804375 \\0.2126729 & 0.7151522 & 0.0721750 \\0.0193339 & 0.1191920 & 0.9503041\end{pmatrix}\begin{pmatrix}R_{\text{linear}} \\G_{\text{linear}} \\B_{\text{linear}}\end{pmatrix}$

4. Applying the function _f_ over previously calculated linear xyz color values normalized by its reference illuminant

The the reference illuminants are the 2° [D65](https://en.wikipedia.org/wiki/Standard_illuminant#D65_values) white points having values

$X_n = 0.95047$
$Y_n = 1.00000$
$Z_n = 1.08883$

And function _f_ is defined as
$f(t) = \begin{cases}t^{\frac{1}{3}} & \text{if } t > 0.008856 \\7.787 \cdot t + \frac{16}{116} & \text{otherwise}\end{cases}$

So,

$f_x = f( X / X_n)$
$f_y = f( Y / Y_n)$
$f_Z = f( Z / Z_n)$

4. Calculating Lab color values using the formula

$L = (116 * f_y) - 16$
$a* = 500 * (f_x - f_y)$
$b* = 200 * (f_y - f_z)$

## DeltaE Calculation

The DeltaE is the difference in visual perception of any two given colors.

It gives the 'distance' between any two colors in the CIELab color space. Smaller distances indicate that the colors are nearby in shade.

#### Sources

1. https://en.wikipedia.org/wiki/CIELAB_color_space
2. https://zschuessler.github.io/DeltaE/learn/
3. https://stackoverflow.com/questions/492211/is-there-an-easy-way-to-compare-how-close-two-colors-are-to-each-other
4. https://www.easyrgb.com/en/math.php
5. https://kaizoudou.com/from-rgb-to-lab-color-space/
