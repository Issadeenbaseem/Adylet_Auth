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
                  v-model="form.FirstName"
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
                  v-model="form.LastName"
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
                  type="text"
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
                  type="password"
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
              type="file"
              id="pxp-candidate-photo-choose-file"
              accept="image/*"
              @change="upload_photo"
              ref="file"
            />
            <label for="pxp-candidate-photo-choose-file" class="pxp-cover"
              ><span>Upload<br />Photo</span></label
            >
          </div>
        </div>
      </div>

      <div class="mt-4 mt-lg-5">
        <button type="submit" class="btn rounded-pill pxp-modal-cta">
          Upload
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import gql from "graphql-tag";
//import { userQuery } from "../graphql/queries/user";

export default {
  middleware: "auth",

  mounted() {
    this.form.email = this.user.attributes.email;
    this.form.username = this.user.attributes.username;
    this.form.id = this.$auth.user.id;
    this.form.files = this.$refs.file.files[0];
  },

  data() {
    return {
      user: [],
      form: {
        username: "",
        FirstName: "",
        LastName: "",
        email: "",
        password: "",
        ContactNumber: "",
        PreferredCommunicationChannel: "",
        files: "",
        id: "",
        name: "",
      },
    };
  },

  methods: {

   async  upload_photo(){
      let refld = this.$auth.user.id;
       let file = this.$refs.file.files[0];
      console.log(refld)

      await this.$apollo
          .mutate({
            mutation: gql`
            mutation(
              $refld: ID!
              $ref: String
              $field: String
              $file: Upload!
            ) {
              upload(refId:$refld,ref:$ref,field:$field,file:$file) {
                data {
                  id
                }
            }
            }
          `,
            variables:{
                  file,refld,ref:"plugin::users-permissions.user",field:"DisplayPicture"
            }
          })
      },

    // async upload_photo() {
    //   console.log();
    //   let id = this.$auth.user.id;
    //   let files = this.$refs.file.files[0];
    //   console.log(id);
    //   console.log(files);

    //   try {
    //     const {} = await this.$apollo.mutate({
          // mutation: gql`
          //   mutation (
          //     $refld: ID!
          //     $ref: String
          //     $field: String
          //     $file: Upload!
          //   ){}
          //     upload(refId:$id, ref:"plugin::users-permissions.user",field: "DisplayPicture", file:files) {
          //       data {
          //         id
          //         attributes {
          //           name
          //         }
          //       }

          //   }
          // `,
    //       variables() {
    //         return{
    //           id, files
    //         }
    //         },
    //       context: {
    //         hasUpload: true,
    //       },
    //     });
    //   } catch (error) {}
    // },

    async upload() {
      this.error = null;
      const credentials = this.form;
      let email = this.$auth.user.email;
      console.log(email);
      let id = this.form.id;

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
      } catch (e) {
        console.log(e);
      }
    },
  },

  apollo: {
    data: {

      query: gql`
        query($id:ID!) {
          usersPermissionsUser(id: $id) {

            data {
              id
              attributes {
                username
                email
                PreferredCommunicationChannel
                confirmed
              }
            }
          }
        }
      `,
      manual: true,
      result({ data }) {
        console.log(data)
        this.user = data.usersPermissionsUser.data;

      },
      variables(){
        return{
          id:this.$auth.user.id
        }


      },
    },
  },
};
</script>

<style></style>
