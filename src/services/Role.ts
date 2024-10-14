import { ROLE } from "../constants/common";

const AccessControl = require("accesscontrol");

let grantList = [
    { role: ROLE.ADMIN, resource: 'Login', action: 'create:own', attributes: '*' },
    { role: ROLE.USER, resource: 'VerifyPhoneOtp', action: 'create:own', attributes: '*' },
    { role: ROLE.USER, resource: 'LoginWithPhone', action: 'create:own', attributes: '*' },
];

const ac = new AccessControl(grantList);
export default ac;
