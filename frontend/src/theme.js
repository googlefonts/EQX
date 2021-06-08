import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';
import { letterSpacing } from '@material-ui/system';

// grey reference (see https://material-ui.com/customization/color/#color-palette)
// 50		#fafafa		100	#f5f5f5
// 200	#eeeeee		300	#e0e0e0
// 400	#bdbdbd		500	#9e9e9e // DEFAULT
// 600	#757575		700	#616161
// 800	#424242		900	#212121


const globalTheme = createMuiTheme({
	palette: {
   	primary: grey,
		background: {
			paper2: "rgb(245, 245, 245)",
			footer: "rgb(224, 224, 224)"
		},
   	white: "#fff",
	},
	typography: {
		fontFamily: [
			'-apple-system',
			'BlinkMacSystemFont',
			'"Segoe UI"',
			'Roboto',
			'"Helvetica Neue"',
			'Arial',
			'sans-serif',
			'"Apple Color Emoji"',
			'"Segoe UI Emoji"',
			'"Segoe UI Symbol"',
		].join(','),
		body1: {
			"&.MuiTypography-body1": {
				maxWidth: '700px',
				marginRight: 'auto',
				marginLeft: 'auto',
			}
		},
		h3: {
			fontWeight: '900',
			textTransform: "uppercase",
			letterSpacing: "0.03em",
			opacity: "0.3"
		},
	},
});

// color: theme.palette.getContrastText(theme.palette.error.main),
// background: theme.palette.error.main,

let theme = createMuiTheme({
	overrides: {
		MuiDrawer: {
			paperAnchorDockedRight: {
				borderLeft: "none",
				paddingTop: '64px',
				width: 230
			},
		},
		MuiTypography: {
			body2: {
				maxWidth: "800px"
			},
			h4: {
				lineHeight: 1.4
			},
			h6: {
				letterSpacing: "0.04em",
				fontSize: "1rem!important",
				textTransform: "uppercase"
			},
		},
		MuiInputBase: {
			input: {
				lineHeight: 1.4
			},
		},
		MuiButton: {
			root: {
				'&.MuiButton-containedPrimary': {
					backgroundColor: globalTheme.palette.primary.dark,
					color: globalTheme.palette.getContrastText(globalTheme.palette.primary.dark),
			  }
			}
		},
		MuiFab: {
			root: {
				backgroundColor: globalTheme.palette.primary.dark+"!important",
				color: globalTheme.palette.getContrastText(globalTheme.palette.primary.dark)+"!important",
			}
		},
		MuiTabs: {
			root: {
				backgroundColor: globalTheme.palette.primary.dark+"!important",
				color: globalTheme.palette.getContrastText(globalTheme.palette.primary.dark)+"!important",
			}
		},
		MuiCircularProgress: {
			circle: {
				color: globalTheme.palette.primary.dark,
			}
		},
		MuiLinearProgress: {
			bar: {
				backgroundColor: globalTheme.palette.primary.dark+"!important",
			}
		},
		MuiDialog: {
			paper: {
				width: "100%"
			},
		},
		MuiListItem: {
			root: {
				"&$selected": { 
					background: globalTheme.palette.primary.dark,
					color: globalTheme.palette.getContrastText(globalTheme.palette.primary.dark),
					"& .MuiSvgIcon-root": {
						color: globalTheme.palette.getContrastText(globalTheme.palette.primary.dark),
					},
				},
			},
		},
	}, 
}, globalTheme);
theme = responsiveFontSizes(theme);

export default theme;