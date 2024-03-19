import * as jwt from "jsonwebtoken";

export const generateToken = async (id: string, email: string) => {
    // Create a payload containing email and id
    const payload = {
        id, email
    };

    // Sign the payload with the secret key and set expiration time to 1 day
    const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
        expiresIn: '1d'
    });

    // Return the generated token
    return token;
};


export const verifyToken = async (token: string) => {
    try {

        const verify = jwt.verify(token, process.env.JWT_SECRET as string);
        // Verify the token's authenticity using the secret key

        // If verification fails, return null
        if (!verify) {
            return null;
        }

        // Decode the token to extract the user ID
        const decode = jwt.decode(token) as jwt.JwtPayload;
        return decode;
    } catch (error) {
        // Handle any errors that might occur during token verification or decoding
        console.error('Error verifying token:', error);
        return null;
    }
};

export function removeDollarSign(token: string): string {
    if (token.startsWith('$')) {
        return token.substring(1);
    }
    return token;
}