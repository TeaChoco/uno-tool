//-Path: "uno-tool/src/custom/Icon.tsx"
import * as fa from "@fortawesome/free-solid-svg-icons";
// import { IconProp } from "@fortawesome/fontawesome-svg-core";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export type TypeIcon = keyof typeof fa;

const Icon = {
	I: FontAwesomeIcon,
	fa: fa,
};

export default Icon;
