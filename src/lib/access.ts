import type {AccessArgs} from 'payload/config';
import {User} from "@/payload-types";
import {checkRole} from "@/lib/utils";


type isAdmin = (args: AccessArgs<unknown, User>) => boolean;

export const admins: isAdmin = ({req: {user}}) => {
    return checkRole('admin', user);
};

import type {Access} from 'payload/types';


export const adminsAndUser: Access = ({req: {user}}) => {
    if (user) {
        if (checkRole('admin', user)) {
            return true;
        }

        return {
            id: {
                equals: user.id,
            },
        };
    }

    return false;
};


export const anyone: Access = () => true;
