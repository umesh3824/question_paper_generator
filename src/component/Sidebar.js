import { useState } from 'react';
import { createStyles, Navbar, Group, Text } from '@mantine/core';
import {
    IconBellRinging,
    IconFingerprint,
    IconKey,
    IconSettings,
    Icon2fa,
    IconDatabaseImport,
    IconReceipt2,
    IconSwitchHorizontal,
    IconLogout,
} from '@tabler/icons';
import { MantineLogo } from '@mantine/ds';
import { Link } from 'react-router-dom';
const useStyles = createStyles((theme, _params, getRef) => {
    const icon = getRef('icon');
    return {
        navbar: {
            backgroundColor: theme.fn.variant({ variant: 'filled', color: theme.primaryColor })
                .background,
        },

        version: {
            // backgroundColor: theme.fn.lighten(
            //     theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background!,
            //     0.1
            // ),
            color: theme.white,
            fontWeight: 700,
        },

        header: {
            paddingBottom: theme.spacing.md,
            marginBottom: theme.spacing.md * 1.5,
            // borderBottom: `1px solid ${theme.fn.lighten(
            //     theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background!,
            //     0.1
            // )}`,
        },

        footer: {
            paddingTop: theme.spacing.md,
            marginTop: theme.spacing.md,
            // borderTop: `1px solid ${theme.fn.lighten(
            //     theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background!,
            //     0.1
            // )}`,
        },

        link: {
            ...theme.fn.focusStyles(),
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none',
            fontSize: theme.fontSizes.sm,
            color: theme.white,
            padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
            borderRadius: theme.radius.sm,
            fontWeight: 500,

            '&:hover': {
                // backgroundColor: theme.fn.lighten(
                //     theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background!,
                //     0.1
                // ),
            },
        },

        linkIcon: {
            ref: icon,
            color: theme.white,
            opacity: 0.75,
            marginRight: theme.spacing.sm,
        },

        linkActive: {
            '&, &:hover': {
                // backgroundColor: theme.fn.lighten(
                //     theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background!,
                //     0.15
                // ),
                backgroundColor:'#FFF',
                color: theme.primaryColor,
                [`& .${icon}`]: {
                    opacity: 0.9,
                },
            },
        },
    };
});

const data = [
    { link: '/home/generate_paper', label: 'Generate Question Paper', icon: IconBellRinging },
    { link: '/home/manage_question', label: 'Manage Questions', icon: IconReceipt2 },
    { link: '/home/manage_subject', label: 'Manage Subject', icon: IconFingerprint },
    { link: '/home/logout', label: 'Logout', icon: IconKey }
];

export default function Sidebar() {
    const { classes, cx } = useStyles();
    const [active, setActive] = useState('Billing');

    const links = data.map((item) => (
        <Link
            className={cx(classes.link, { [classes.linkActive]: item.label === active })}
            to={item.link}
            key={item.label}
            onClick={(event) => {
                setActive(item.label);
                //  event.preventDefault();
            }}
        >

            <span>{item.label}</span>
        </Link>
    ));

    return (
        <Navbar height='100vh' width={{ sm: 300 }} p="md" className={classes.navbar}>
            <Navbar.Section grow>
                {links}
            </Navbar.Section>
        </Navbar>
    );
}