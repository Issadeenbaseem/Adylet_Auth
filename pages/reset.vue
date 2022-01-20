<template>
 <div
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
            Reset Password
          </h5>
            <div class="modal-title2">

          </div>
           <Notification v-if="error" class="modal-title2 text-left" type="danger" :message="error" />
            <Notification v-if="success" class="modal-title1 text-left mt-4" type="danger" :message="success" />
          <form method="POST" @submit.prevent="resetPassword" class="mt-4">

            <div class="form-floating mb-3">
              <input

                type="password"
                class="form-control"
                id="pxp-signin-password"
                placeholder="New Password"
                v-model="form.password1"
              />
              <label for="pxp-signin-password">New Password</label>

            </div>
            <div class="form-floating mb-3">
              <input

                type="password"
                class="form-control"
                id="pxp-signin-password"
                placeholder="Password"
                 v-model="form.password2"
              />
              <label for="pxp-signin-password">Confirm New Password</label>

            </div>
            <button  type="submit" class="btn rounded-pill pxp-modal-cta" >
              Continue
            </button>


          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import gql from "graphql-tag";
import Notification from '~/components/Notification'

export default {

  components: {
    Notification
  },
  asyncData(context) {
    if (!context.route.query.code) context.redirect('/')
    else
      return {
        code: context.route.query.code
      }
  },
  data() {
    return {
      form:{
        password1: '',
        password2: '',


      },

      success: null,
      error: null,

    }
  },
  methods: {
     async resetPassword() {
      this.error = null;
      const credentials = this.form;
      let code = this.code

      try {
        const {} = await this.$apollo.mutate({
          mutation: gql`
            mutation ($password1: String!, $password2: String!, $code: String!) {
              resetPassword(

                  password: $password1
                  passwordConfirmation: $password2
                  code: $code

              ) {
                jwt

              }
            }
          `,
          variables: {...credentials, code}
        });
        //set the jwt to the this.$apolloHelpers.onLogin
   
        window.location.replace("http://localhost:3000");

      } catch (e) {
        this.error = e.message.replace("GraphQL error:", "   ");
      }
    },
  }
}
</script>

<style>

</style>
