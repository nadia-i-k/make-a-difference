<template>
    <v-container fill-height>
        <v-layout align-center justify-center row fill-height>
            <v-flex xs12 md4>
                <v-btn
                  @click="handleClick"
                  color="primary"
                  large
                >
                  Sign In with Blockstack
                </v-btn>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
  import { mapGetters, mapMutations, mapActions } from "vuex";

  export default {
      name: "SignIn",

      components: {},

      computed: {
        ...mapGetters([
            'session'
        ]),
      },

      methods: {
        handleClick() {
          this.session.redirectToSignIn();
        }
      }
  };
</script>
