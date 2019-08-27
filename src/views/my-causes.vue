<template>
    <v-container grid-list-lg>
        <v-layout row wrap>
            <v-flex xs12>
                <h1>My Causes</h1>
                <p>This is the list of causes you have joined.</p>
            </v-flex>
        </v-layout>
        <v-layout row wrap>
            <v-flex xs12 md4 lg3 v-for="cause in causes" :key="cause.id">
                <v-card>
                    <v-img
                        height="200px"
                        :src="cause.imageUrl"
                    />
                    <v-card-title>{{ cause.title }}</v-card-title>
                    <v-card-text>{{ truncate(cause.description) }}</v-card-text>

                    <v-card-actions>
                        <v-btn @click="leave(cause)" color="primary" small>Leave</v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import * as ellipsize from 'ellipsize';
    import {mapGetters, mapMutations, mapActions} from "vuex";
    import causes from '../assets/causes.json';

    export default {
        name: "CauseList",

        components: {},

        data: () => ({
            ids: []
        }),

        created() {
            this.session
                .getFile('/causes-v2.txt', {decrypt: true})
                .then((input) => {
                    if (input) {
                        const data = JSON.parse(input);
                        this.ids = Object.keys(data);
                    }
                })
            ;
        },

        computed: {
            ...mapGetters([
                'session',
                'username'
            ]),

            causes() {
                const results = [];

                for (const cause of causes) {
                    if (this.ids.includes(cause.id)) {
                        results.push(cause);
                    }
                }

                return results;
            }
        },

        methods: {
            truncate(text) {
                return ellipsize(text, 100);
            },

            leave(cause) {
                this.session
                    .getFile('/causes-v2.txt', {decrypt: true})
                    .then((input) => {
                        let data = {};

                        if (input) {
                            data = JSON.parse(input);
                        }

                        delete data[cause.id];
                        this.ids = Object.keys(data);

                        return this.session.putFile(
                            '/causes.txt',
                            JSON.stringify(data),
                            {encrypt: true}
                        );
                    })
                    .then(() => {
                        console.log(`Left ${cause.id}.`);
                    })
                ;
            }
        }
    };
</script>
