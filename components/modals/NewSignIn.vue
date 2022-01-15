<template>
  <div
    class="modal fade pxp-user-modal"
    id="pxp-newsignin-modal"
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
           Sign In
          </h5>
          <h5 class="modal-title1 text-left mt-4" id="signinModal">
           Your are Registed Now . You can SignIn
          </h5>
          <div class="modal-title2">
          <Notification v-if="error" class="modal-title2 text-left" type="danger" :message="error" />
          </div>

          <form method="POST" @submit.prevent="handleLoginSubmit" class="mt-4">
            <div class="form-floating mb-3">
              <input
                v-model="form.identifier"
                type="email"
                class="form-control"
                id="pxp-signin-email"
                placeholder="Email address"
                required="true"
              />
              <label for="pxp-signin-email">Email address</label>
              <span class="fa fa-envelope-o"></span>
            </div>
            <div class="form-floating mb-3">
              <input
                v-model="form.password"
                type="password"
                class="form-control"
                id="pxp-signin-password"
                placeholder="Password"
                required="true"
              />
              <label for="pxp-signin-password">Password</label>
              <span class="fa fa-lock"></span>
            </div>
            <button  type="submit" class="btn rounded-pill pxp-modal-cta" >
              Continue
            </button>
            <div class="mt-4 text-center pxp-modal-small">
              <a class="pxp-modal-link"
                 data-bs-target="#pxp-forgot-modal"  data-bs-toggle="modal"  data-bs-dismiss="modal"  role="button">Forgot password</a>
            </div>
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
import Notification from "~/components/Notification";
export default {
  middleware: "auth",

  auth: "guest",
  components: {
    Notification,
  },

  data() {
    return {
      form: {
        identifier: "",
        password: "",
      },
      formBusy: false,
      success: null,
      error: null,
    };
  },

  methods: {
    async handleLoginSubmit() {
      const credentials = this.form;
       this.formBusy = true

      try {
        // Using our custom strategy
        await this.$auth.loginWith("graphql", credentials);
        $('#pxp-newsignin-modal').modal('hide');
      } catch (e) {
         this.error = e.message.replace("GraphQL error:", "   ");
      }
    },
  },
};
</script>
