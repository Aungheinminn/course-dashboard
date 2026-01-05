import { jwtDecode } from "jwt-decode";

export class JwtHelper {
 constructor () {}
 
 public decodeToken(token: string): any {
    return  jwtDecode(token);
 }
}
