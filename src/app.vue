<template>
    <v-app>
        <v-navigation-drawer v-model="drawer" app>
            <v-list dense clipped>
                <v-list-item to="/">
                    <v-list-item-action>
                        <v-icon>mdi-star</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Home</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item to="/sign-in">
                    <v-list-item-action>
                        <v-icon>mdi-star</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Sign In</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>

        <v-app-bar app>
            <v-app-bar-nav-icon @click.stop="handleDrawlerClick"></v-app-bar-nav-icon>

            <v-toolbar-title>Make a Difference</v-toolbar-title>

            <v-spacer></v-spacer>

            <v-btn
                text
                @click="handleSignButtonClick"
            >
                {{ signButtonLabel }}
            </v-btn>
        </v-app-bar>

        <v-content>
            <router-view />
        </v-content>
    </v-app>
</template>

<script>
import { AppConfig, UserSession } from "blockstack";
import { mapGetters, mapMutations, mapActions } from "vuex";

export default {
    name: "App",

    components: {
    },

    created() {
        const appConfig = new AppConfig(["store_write", "publish_data"]);
        const session = new UserSession(appConfig);

        this.setSession(session);

        if (session.isUserSignedIn()) {
            const userData = session.loadUserData();
            const username = userData.username;

            this.setUsername(username);
        } else if (session.isSignInPending()) {
            session.handlePendingSignIn().then(userData => {
                window.location = window.location.origin;
            });
        } else {
        }
    },

    data: () => ({
        drawer: null
    }),

    computed: {
        ...mapGetters([
            'session',
            'username'
        ]),

        signButtonLabel() {
            if (this.username) {
                return 'Sign Out';
            }

            return 'Sign In';
        }
    },

    methods: {
        ...mapMutations([
            'setSession',
            'setUsername'
        ]),

        handleDrawlerClick() {
            this.drawer = !this.drawer;
        },

        handleSignButtonClick() {
            if (this.username) {
                this.session.signUserOut();
                this.setUsername(null);
                this.$router.push('home');
            }
            else {
                this.session.redirectToSignIn();
            }
        },

        // s() {
        //     const options = {
        //         encrypt: false
        //     };

        //     this.session
        //         .putFile("/hello.txt", "this is cooooL!!!!", options)
        //         .then(() => {
        //             console.log("Ok");
        //         });
        // }
    }
};
</script>
