export default {
	COLOR: {
		LIGHT_BLUE_ALPHA_20: "rgba(26, 179, 255, .20)",
		ORANGE: "#f8ac59",
		ORANGE_DARK: "#eea236",
		RED: "#E53935",
		LIGHT_GRAY: "#ddd",
		ULTRA_LIGHT_GRAY: "#eee",
		WHITE: "#ffffff"
	},
    PANEL_TYPE: {
        DEFAULT: "default",
        TRANSPARENT: "transparent",
    },
    TOOLTIP_TYPE: {
        INFO: "info",
    },
    STEP_STATUS: {
        FINISH: "finish",
        ONGOING: "ongoing",
        WAIT: "wait",
    },
    PROGRESS_ONBOARDING_NAME: {
        SET_PASSWORD:"Set Password",
        SET_REPORT_TO:"Set Report To",
        GO_APP_HOME:"Go app home",
    },
    LIST_MULTI_SELECT: {
		ID_ITEM_GROUP:"item_group",
        ID_SEARCH_BAR:"search_bar",
        ID_SELECT_ALL:"select_all",
        ID_SEPERATOR:"seperator",
		ID_NO_RESULT:"no_result",
        NAME_SEARCH_BAR:"SearchBar",
        NAME_SELECT_ALL:"Select all",
        NAME_DESELECT_ALL:"Deselect all",
        NAME_SEPERATOR:"Seperator",
		NAME_NO_RESULT:"No result",
    },
	REQUEST_STATUS: { //used in profile page
		IDLE: "idle",
		PENDING: "pending",
		SUCCESS: "success",
		FAIL: "fail"
	},
	PROFILE_PERMISSION: {
		READ: "read",
		WRITE: "write"
	},
	TOOLTIP_PLACEMENT: {
    	TOP:"top",
		LEFT:"left",
		RIGHT:"right",
		BOTTOM:"bottom",
	},
	CSS_TEXT_ALIGN: {
	LEFT:"swv-textalign-left",
	CENTER:"swv-textalign-center",
	RIGHT:"swv-textalign-right",
	},
	DROPDOWN_BUTTON_TYPE: {
    	ANCHOR: 'anchor',
		BUTTON: 'button'
	},
	PAYROLL_STATUS: {
		ADJUST: 'ADJUST',
		CONFIRM: 'CONFIRM',
		SUBMISSION: 'SUBMISSION',
		COMPLETE: 'COMPLETE',
	},
	PAYROLL_DEDUCTION: {
		DEDUCTION_MASTER : {
			BASE_DEDUCTION:"UNPAID_LEAVE",
		},
	},
	GENDER: ['Female', 'Male'],
	FORM_TEMPLATE_TYPE: {
		EPF: "STATUTORY_EPF/PDF",
		SOCSO: "STATUTORY_SOCSO/PDF",
		PCB: "STATUTORY_PCB/PDF",
	},
	FILE_TEMPLATE_TYPE: {
		EPF: "STATUTORY_EPF/TXT",
		SOCSO: "STATUTORY_SOCSO/TXT",
		PCB: "STATUTORY_PCB/TXT",
	},
	PAYROLL_REPORT_TEMPLATE_TYPE: {
		CSV:"CSV",
		PDF:"PDF",
	},
	ONBOARDING_STATUS_TYPE: {
		IDLE: -1,
		INCOMPLETE: 0,
		COMPLETE: 1
	},
	MISC: {
		NO_JOB_TITLE:"No job title",
		NO_NAME:"No name",
	}
};
