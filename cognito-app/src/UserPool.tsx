import { CognitoUserPool } from "amazon-cognito-identity-js";


 const poolData = {
    UserPoolId: "us-east-1_ookt7WYen",
    ClientId: "3l5pn1igb3sro4sgae1qnt9aqm"
}

export default new CognitoUserPool(poolData);