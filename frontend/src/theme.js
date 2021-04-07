import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import { purple } from '@material-ui/core/colors';

let theme = createMuiTheme({
	palette: {
   	primary: purple,
		background: {
			paper2: "rgb(245, 245, 245)",
			footer: "rgb(224, 224, 224)"
		},
	},
	typography: {
		body1: {
			"&.MuiTypography-body1":{
				maxWidth: '700px',
				marginRight: 'auto',
				marginLeft: 'auto',
			}
		},
	},
});

theme.overrides = {
	...theme.overrides,
	MuiDrawer:{
		...theme.MuiDrawer,
		paperAnchorDockedRight: {
			...theme.paperAnchorDockedRight,
			borderLeft: "none",
			paddingTop: '64px',
			width: 230
		},
	},
	MuiTypography:{
		...theme.MuiTypography,
		body2: {
			...theme.body2,
			maxWidth: "800px"
		},
		h4: {
			...theme.h4,
			lineHeight: 1.4
		},
		h6: {
			...theme.h6,
			letterSpacing: "0.04em",
			fontSize: "1rem!important",
			textTransform: "uppercase"
		},
	},
	MuiInputBase:{
		...theme.MuiInputBase,
		input: {
			...theme.input,
			lineHeight: 1.4
		},
	},
	MuiDialog:{
		...theme.MuiDialog,
		paper: {
			...theme.paper,
			width: "100%"
		},
	},
	MuiListItem: {
		...theme.MuiListItem,
		root: {
			...theme.root,
			"&$selected": { 
				background: theme.palette.primary.main,
				color: "white",
				"& .MuiSvgIcon-root": {
					color: "white",
				 },
			},
		},
	},
}
theme = responsiveFontSizes(theme);

export default theme;