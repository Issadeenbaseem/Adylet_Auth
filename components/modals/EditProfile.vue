<template>
  <div
    class="modal fade pxp-user-modal"
    id="pxp-editprofile-modal"
    aria-hidden="true"
    aria-labelledby="editprofileModal"
    tabindex="-1"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="pxp-user-modal-fig text-center">
            <img src="images/signup-fig.png" alt="Sign up" />
          </div>
          <h5 class="modal-title text-center mt-4" id="signupModal">
            Create an account
          </h5>

          <Notification v-if="error" type="danger" :message="error" />
          <form @submit.prevent="register" class="mt-4">
            <div class="form-floating mb-3">
              <input
                type="text"
                v-model="form.username"
                class="form-control"
                id="pxp-signup-email"
                placeholder="Email address"
              />
              <label for="pxp-signup-email">Create Username</label>
              <span class="fa fa-user"></span>
            </div>
            <div class="form-floating mb-3">
              <input
                type="email"
                v-model="form.email"
                class="form-control"
                id="pxp-signup-email"
                placeholder="Email address"
              />
              <label for="pxp-signup-email">Email address</label>
              <span class="fa fa-envelope-o"></span>
            </div>
            <div class="form-floating mb-3">
              <input
                type="password"
                v-model="form.password"
                class="form-control"
                id="pxp-signup-password"
                placeholder="Create password"
              />
              <label for="pxp-signup-password">Create password</label>
              <span class="fa fa-lock"></span>
            </div>
            <button
              type="submit"
              class="btn rounded-pill pxp-modal-cta"
              data-mdb-dismiss="modal"
            >
              Continue
            </button>
            <div class="mt-4 text-center pxp-modal-small">
              Already have an account?
              <a
                role="button"
                class=""
                data-bs-target="#pxp-signin-modal"
                data-bs-toggle="modal"
                >Sign in</a
              >
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import gql from "graphql-tag";
import Notification from "~/components/Notification";

export default {
  components: {
    Notification,
  },
  data() {
    return {
      form: {
        username: "",
        password: "",
        email: "",
      },
      success: null,
      error: null,
    };
  },

  methods: {
    async register() {
      this.error = null;
      const credentials = this.form;
      try {
        const {} = await this.$apollo.mutate({
          mutation: gql`
            mutation ($username: String!, $email: String!, $password: String!) {
              register(
                input: {
                  username: $username
                  password: $password
                  email: $email
                }
              ) {
                jwt
                user {
                  username
                  email
                }
              }
            }
          `,
          variables: credentials,
        });
        //set the jwt to the this.$apolloHelpers.onLogin
        await this.$apolloHelpers.onLogin();

       $('#pxp-newsignin-modal').modal('toggle');
        $('#pxp-signup-modal').modal('hide');


      } catch (e) {
        this.error = e.message.replace("GraphQL error:", "   ");
      }
    },
  },
};

</script>
