<template>
    <v-container grid-list-lg>
        <v-layout row wrap>
            <v-flex xs12>
                <h1>Causes</h1>
                <p>Choose the causes that affect you and you would like to fight for. It is time to demand your rights!</p>
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
                        <v-btn color="primary mr-1" small>Learn more</v-btn>
                        <v-btn @click="join(cause)" color="primary" small>Join</v-btn>
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
            causes: causes
        }),

        computed: {
            ...mapGetters([
                'session',
                'username'
            ]),
        },

        methods: {
            truncate(text) {
                return ellipsize(text, 100);
            },

            join(cause) {
                this.session
                    .getFile('/causes.txt', {decrypt: false})
                    .then((input) => {
                        let data = {};

                        if (input) {
                            data = JSON.parse(input);
                        }

                        data[cause.id] = true;

                        return this.session.putFile(
                            '/causes.txt',
                            JSON.stringify(data),
                            {encrypt: false}
                        );
                    })
                    .then(() => {
                        console.log(`Joined to ${cause.id}.`);
                    })
                ;
            }
        }
    };
</script>
