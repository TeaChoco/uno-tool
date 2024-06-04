//-Path: "uno-tool/src/components/ArrowSvg.tsx"
import {Box, SxProps, Theme} from "@mui/material";

export default function ArrowSvg({
	sx,
	color = "#000000",
}: {
	color?: string;
	sx?: SxProps<Theme>;
}) {
	return (
		<Box sx={sx}>
			<svg
				id='svg2'
				width='100%'
				height='100%'
				version='1.1'
				xmlns='http://www.w3.org/2000/svg'
				viewBox='0 0 512 512' // Set viewBox to match SVG dimensions
			>
				<defs id='defs4' />
				<g id='layer1' transform='translate(0,-540.36218)'>
					<g
						id='g3016'
						transform='matrix(-1,0,0,1,502.69953,6.6120369e-6)'
					/>
					<g id='g3011'>
						<g
							id='g3026'
							transform='translate(10.941761,11.644075)'>
							<path
								d='M 323.28125 41.21875 L 313.09375 65.6875 C 244.42432 53.486223 175.24779 75.484665 126.34375 122.15625 C 108.84699 138.85429 93.939255 158.70374 82.59375 181.28125 L 109.375 194.75 C 145.49993 122.86154 223.05882 83.106874 301.25 94.15625 L 292.15625 116.03125 L 391.3125 113.4375 L 323.28125 41.21875 z '
								id='path3028'
								fill={color}
								stroke='none'
								transform='translate(-10.941761,528.7181)'
							/>
						</g>
						<g
							id='g3032'
							transform='matrix(-0.5,0.8660254,-0.8660254,-0.5,1084.5415,984.45048)'>
							<path
								d='M 433.84375 151.125 L 408.78125 167.59375 C 452.97898 234.82759 448.64258 321.90205 399.96875 384.09375 L 385.5625 365.25 L 338.21875 452.4375 L 434.78125 429.625 L 418.6875 408.5625 C 463.58764 355.19388 479.12282 284.28093 463.15625 218.59375 C 457.4437 195.09209 447.72369 172.23925 433.84375 151.125 z '
								id='path3034'
								fill={color}
								stroke='none'
								transform='matrix(-0.5,-0.86602541,0.86602541,-0.5,157.679,1161.2846)'
							/>
						</g>
						<g
							id='g3014'
							transform='matrix(-0.5,-0.8660254,0.8660254,-0.5,-294.73343,1427.8119)'>
							<path
								d='M 71.1875 236.96875 L 42.6875 331.96875 L 68.96875 328.5625 C 92.735932 394.13514 146.37754 443.07691 211.25 462.09375 C 234.45931 468.89737 259.1183 471.86951 284.34375 470.40625 L 282.59375 440.46875 C 202.2785 445.12762 129.061 397.82707 99.53125 324.59375 L 123.03125 321.53125 L 71.1875 236.96875 z '
								id='path3016'
								fill={color}
								stroke='none'
								transform='matrix(-0.5,0.86602541,-0.86602541,-0.5,621.18729,698.9715)'
							/>
						</g>
					</g>
				</g>
			</svg>
		</Box>
	);
}