import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const token: string = this.getToken(context);
        const roles: string[] = this.getRoles(context);

        return true;
    }

    private getToken(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        if (request.headers.authorization && request.headers.authorization.split(' ')[0] === 'Bearer') {
            return request.headers.authorization.split(' ')[1];
        }
        throw new UnauthorizedException('Token not found');
    }

    private getRoles(context: ExecutionContext): string[] {
        return this.reflector.getAllAndMerge('roles', [context.getHandler(), context.getClass()]);
    }
}
