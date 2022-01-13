<template>
  <div
    class="modal fade pxp-user-modal"
    id="pxp-signin-modal"
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
            Welcome back!
          </h5>
          <form method="POST" @submit.prevent="handleLoginSubmit" class="mt-4">
            <div class="form-floating mb-3">
              <input
                v-model="form.identifier"
                type="email"
                class="form-control"
                id="pxp-signin-email"
                placeholder="Email address"
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
              />
              <label for="pxp-signin-password">Password</label>
              <span class="fa fa-lock"></span>
            </div>
            <button :disabled="formBusy" type="submit" class="btn rounded-pill pxp-modal-cta" >
              Continue
            </button>
            <div class="mt-4 text-center pxp-modal-small">
              <a class="pxp-modal-link">Forgot password</a>
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
export default {
  middleware: "auth",

  auth: "guest",

  data() {
    return {
      form: {
        identifier: "",
        password: "",
      },
      formBusy: false,
    };
  },

  methods: {
    async handleLoginSubmit() {
      const credentials = this.form;
       this.formBusy = true

      try {
        // Using our custom strategy
        await this.$auth.loginWith("graphql", credentials);
         this.formBusy = false
      } catch (errors) {
        this.formBusy = false
      }
    },
  },
};
</script>
