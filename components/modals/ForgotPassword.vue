<template>
  <div
    class="modal fade pxp-user-modal"
    id="pxp-forgot-modal"
    aria-hidden="true"
    aria-labelledby="signinModal"
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
            <img src="images/signin-fig.png" alt="Sign in" />
          </div>
          <h5 class="modal-title text-center mt-4" id="signinModal">
            Forgot Password!
          </h5>
          <Notification v-if="error" class="modal-title2 text-left" type="danger" :message="error" />
            <Notification v-if="success" class="modal-title1 text-left mt-4" type="danger" :message="success" />

          <form method="PUT" @submit.prevent="forgotPassword" class="mt-4">
            <div class="form-floating mb-3">
              <input
                type="email"
                class="form-control"
                id="pxp-signin-email"
                placeholder="Email address"
                v-model="form.email"
              />
              <label for="pxp-signin-email">Email address</label>
              <span class="fa fa-envelope-o"></span>
            </div>

            <button type="submit" class="btn rounded-pill pxp-modal-cta">
              Continue
            </button>

            <div class="mt-4 text-center pxp-modal-small">
              New to Adylet?
              <a
                role="button"
                class=""
                data-bs-target="#pxp-signup-modal"
                data-bs-toggle="modal"
                data-bs-dismiss="modal"
                >Create an account</a
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
     form:{
       email:""
     },
     error:'',
     success:''
    };
  },
  methods: {
     async forgotPassword() {
      this.error = null;
      const credentials = this.form;
      try {
        const {} = await this.$apollo.mutate({
          mutation: gql`
            mutation ( $email: String!) {
              forgotPassword(
               
                  email: $email

              ) {
                ok
              }
            }
          `,
          variables: credentials,
        });
        //set the jwt to the this.$apolloHelpers.onLogin
         this.success="A confirmation link has been sent to your email account. \
         Please click on the link to complete the registration process."


      } catch (e) {
        this.error = e.message.replace("GraphQL error:", "   ");
      }
    },
  },
};
</script>

<style></style>
