/**
 * Created by Iulian Moldovan on 11/02/2017.
 */

const environment = process.env;

export const PORT = environment.PORT || 3000;
export const SECRET = environment.JWT_SECRET || 'Secret key';
export const MONGODB_CONNECTION_STRING = environment.MONGODB_CONNECTION_STRING || 'mongodb://localhost:auth/auth';
