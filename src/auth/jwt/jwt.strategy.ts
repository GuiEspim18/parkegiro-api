import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PlayLoadDto } from "../dto/playload.dto";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor () {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: '123'
        })
    }


    /** 
     * Method to validate the jwt token sent in request 
     * @param data
     * @returns Promise<PlayLoadDto>
     */

    public async validate(data: PlayLoadDto): Promise<PlayLoadDto> {
        const playload: PlayLoadDto = {
            id: data.id,
            username: data.username,
            passoword: data.passoword
        };
        return playload;
    }

}