<template>
    <v-app>
        <v-app-bar app>
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title>Denand Your Rights</v-toolbar-title>

            <v-spacer></v-spacer>

            <v-btn text href="https://github.com/vuetifyjs/vuetify/releases/latest" target="_blank">
                <span class="mr-2">Latest Release</span>
            </v-btn>
        </v-app-bar>

        <v-content>
            <a @click="l">Log In</a>
            <a @click="s">Save</a>

            <div id="nav">
                <router-link to="/">Home</router-link>|
                <router-link to="/about">About</router-link>
            </div>
            <!-- <HelloWorld/> -->
            <router-view />
        </v-content>
    </v-app>
</template>

<script>
    import {AppConfig, UserSession} from "blockstack";
    import {mapGetters, mapMutations, mapActions} from 'vuex';
    import HelloWorld from "./components/HelloWorld";

    export default {
        name: "App",

        components: {
            HelloWorld
        },

        mounted() {
            const appConfig = new AppConfig(['store_write', 'publish_data'])
            const session = new UserSession(appConfig);

            this.setSession(session);

            if (session.isUserSignedIn()) {
                const userData = session.loadUserData();
                const username = userData.username;

                this.setUsername(username);
            }
            else if (session.isSignInPending()) {
                session.handlePendingSignIn().then(userData => {
                    window.location = window.location.origin;
                });
            }
            else {

            }
        },

        data: () => ({
            //
        }),

        computed: {
            ...mapGetters([
                'session'
            ])
        },

        methods: {
            ...mapMutations([
                'setSession',
                'setUsername'
            ]),

            l() {
                this.session.redirectToSignIn();
            },

            s() {
                const options = {
                    encrypt: false
                };

                this.session.putFile("/hello.txt", "this is cooooL!!!!", options)
                    .then(() => {
                        console.log('Ok');
                    })
                ;
            }
        }
    };
</script>
