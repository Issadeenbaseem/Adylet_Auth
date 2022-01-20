<template>
  <div class="pxp-dashboard-content-details">
    <h1>Edit Profile</h1>
    <p class="pxp-text-light">Edit your candidate profile page info.</p>

    <form @submit.prevent="upload">
      <div class="row">
        <div class="col-sm-6">
          <div class="mb-3">
            <label for="pxp-candidate-name" class="form-label">Username</label>
            <input
              v-model="form.username"
              type="text"
              id="pxp-candidate-name"
              class="form-control"
              placeholder="Add your name"
            />
          </div>

          <div class="row">
            <div class="col-sm-6">
              <div class="mb-3">
                <label for="pxp-candidate-title" class="form-label"
                  >First Name</label
                >
                <input
                  type="text"
                  v-model="form.first_name"
                  id="pxp-candidate-title"
                  class="form-control"
                  placeholder="Add your first name"
                />
              </div>
            </div>
            <div class="col-sm-6">
              <div class="mb-3">
                <label for="pxp-candidate-location" class="form-label"
                  >Last Name</label
                >
                <input
                  type="tel"
                  v-model="form.last_name"
                  id="pxp-candidate-location"
                  class="form-control"
                  placeholder="Add your last name"
                />
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-6">
              <div class="mb-3">
                <label for="pxp-candidate-location" class="form-label"
                  >PreferredCommunicationChannel</label
                >
                <input
                  type="tel"
                  v-model="form.PreferredCommunicationChannel"
                  id="pxp-candidate-location"
                  class="form-control"
                  placeholder="E.g. SMS / Email"
                />
              </div>
            </div>
             <div class="col-sm-6">
              <div class="mb-3">
                <label for="pxp-candidate-location" class="form-label"
                  >Password</label
                >
                <input
                  type="tel"
                  v-model="form.password"
                  id="pxp-candidate-location"
                  class="form-control"
                  placeholder="E.g. SMS / Email"
                />
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-6">
              <div class="mb-3">
                <label for="pxp-candidate-email" class="form-label"
                  >Email</label
                >
                <input
                  v-model="form.email"
                  type="email"
                  id="pxp-candidate-email"
                  class="form-control"
                  placeholder="candidate@email.com"
                />
              </div>
            </div>
            <div class="col-sm-6">
              <div class="mb-3">
                <label for="pxp-candidate-phone" class="form-label"
                  >ContactNumbers</label
                >
                <input
                  v-model="form.ContactNumber"
                  type="tel"
                  id="pxp-candidate-phone"
                  class="form-control"
                  placeholder="(+12) 345 6789"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="col-xxl-4">
          <div class="form-label">&nbsp;</div>

          <div class="pxp-candidate-photo mb-3">
            <input

              type="image"
              id="pxp-candidate-photo-choose-file"
              accept="image/*"


            />
            <label for="pxp-candidate-photo-choose-file" class="pxp-cover"
              ><span>Upload<br />Photo</span></label
            >
          </div>
        </div>
      </div>

      <div class="mt-4 mt-lg-5">
        <button type="submit" class="btn rounded-pill pxp-modal-cta">Upload</button>
      </div>
    </form>
  </div>
</template>

<script>
import gql from "graphql-tag";
export default {
  data() {
    return {
      form: {
        username: "",
        FirstName: "",
        LastName: "",
        email: "",
        password:"",
        ContactNumber: "",
        PreferredCommunicationChannel: "",

      },
    };
  },
  methods: {
    asyncData(context) {
      if (!context.route.query.id) context;
      else
        return {
          id: context.route.query.id,
        };
    },
    async upload() {
      this.error = null;
      const credentials = this.form;
      let id = this.$route.query.id;


      try {
        const {} = await this.$apollo.mutate({
          mutation: gql`
            mutation (
              $username: String!
              $password: String!
              $FirstName: String!
              $LastName: String!
              $email: String!
              $id: ID!
              $ContactNumber: String!
              $PreferredCommunicationChannel: String!
              $file: Upload!

            ) {
              updateUsersPermissionsUser(
                id: $id
                data: {
                  username: $username
                  email: $email
                  FirstName: $FirstName
                  LastName: $LastName
                  password: $password
                  ContactNumber: $ContactNumber
                  PreferredCommunicationChannel: $PreferredCommunicationChannel

                }
              ) {
                data {
                  id
                }
              }
            }
          `,
          variables: { ...credentials, id },
        });
         window.location.replace("http://localhost:3000");
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style></style>
