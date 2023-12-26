import {PrimaryActionEmailHtml} from '../components/emails/PrimaryActionEmail'
import {CollectionConfig} from 'payload/types'
import {checkRole} from "@/lib/utils";
import {admins, adminsAndUser, anyone} from "@/lib/access";


export const Users: CollectionConfig = {
    slug: 'users',
    auth: {
        verify: {
            generateEmailHTML: ({token}) => {
                return PrimaryActionEmailHtml({
                    actionLabel: "verify your account",
                    buttonText: "Verify Account",
                    href: `${process.env.NEXT_PUBLIC_SERVER_URL}/verify-email?token=${token}`
                })
            },
        },
    },
    access: {
        read: adminsAndUser,
        create: anyone,
        update: adminsAndUser,
        delete: admins,
        admin: ({req: {user}}) => checkRole('admin', user),
    },
    admin: {
        hidden: ({user}) => user.role !== 'admin',
        defaultColumns: ['id', 'name'],
    },
    fields: [
        {
            name: 'products',
            label: 'Products',
            admin: {
                condition: () => false,
            },
            type: 'relationship',
            relationTo: 'products',
            hasMany: true,
        },
        {
            name: 'product_files',
            label: 'Product files',
            admin: {
                condition: () => false,
            },
            type: 'relationship',
            relationTo: 'product_files',
            hasMany: true,
        },
        {
            name: 'role',
            defaultValue: 'user',
            required: true,

            type: 'select',
            options: [
                {label: 'Admin', value: 'admin'},
                {label: 'User', value: 'user'},
            ],
        },
    ],
}
