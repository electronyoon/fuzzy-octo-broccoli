// Auth.ts
import * as AWSCognitoIdentity from 'amazon-cognito-identity-js'

const userPoolData: AWSCognitoIdentity.ICognitoUserPoolData = {
    UserPoolId: "ap-northeast-2_xC24WpfEp",
    ClientId: "rpqnq6lol5riblsehum9adnmt"
}

export async function signUp({ Email, Password }: { Email: string, Password: string }): Promise<{ message: string }> {
    return await new Promise((resolve, reject) => {
        const userPool = new AWSCognitoIdentity.CognitoUserPool(userPoolData)

        userPool.signUp(Email, Password, [], [],
            (err: Error | undefined, result: AWSCognitoIdentity.ISignUpResult | undefined): void => {

                if(err)
                    reject({ message: err.message || JSON.stringify(err) })
                else
                    resolve({ message: result?.user.getUsername() + '님, 회원 가입이 성공적으로 완료되었습니다.' })

            })
    })
}

export async function signIn({ Email, Password }: { Email: string, Password: string }): Promise<string> {
    const userData: AWSCognitoIdentity.ICognitoUserData = {
        Username: Email,
        Pool: new AWSCognitoIdentity.CognitoUserPool(userPoolData)
    }

    const authenticationData: AWSCognitoIdentity.IAuthenticationDetailsData = {
        Username: Email,
        Password: Password
    }

    const cognitoUser: AWSCognitoIdentity.CognitoUser = new AWSCognitoIdentity.CognitoUser(userData)
    const authenticationDetails: AWSCognitoIdentity.AuthenticationDetails = new AWSCognitoIdentity.AuthenticationDetails(authenticationData)


    return await new Promise((resolve, reject) => {
        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: function (result: AWSCognitoIdentity.CognitoUserSession) {
                resolve(result.getIdToken().getJwtToken())
            },
            onFailure: function (err) {
                reject(err.message || JSON.stringify(err))
            }
        })
    })

}
