<template>
  <div>
    <b-modal hide-footer ref="form-modal" title="Tambah Penandatanganan SPT">
      <FormSigner
        :isCreated="isCreated"
        ref="signerForm"
        @onSubmit="onSubmit"
        @onCancel="onCancel"
      />
    </b-modal>
    <TableSigner @onDelete="onDelete" @onCreated="onCreated" @onEdit="onEdit" />
  </div>
</template>
<script>
import {
  FETCH_SIGNERS,
  FETCH_SIGNER,
  CREATE_SIGNER,
  DELETE_SIGNER,
  UPDATE_SIGNER,
} from "@/store/actions.type";
import TableSigner from "../components/Signer/TableSigner.vue";
import FormSigner from "../components/Signer/FormSigner.vue";

export default {
  name: "Signer",
  components: { TableSigner, FormSigner },
  data() {
    return {
      isCreated: true,
    };
  },
  mounted() {
    this.$store.dispatch(FETCH_SIGNERS);
  },
  methods: {
    onCreated() {
      this.$refs["form-modal"].show();
      this.isCreated = true;
    },
    onCancel() {
      this.selectedId = null;
      this.$refs["form-modal"].hide();
    },
    async onEdit(id) {
      this.isCreated = false;
      await this.$store.dispatch(FETCH_SIGNER, id);
      this.$refs["form-modal"].show();
    },
    onDelete(id) {
      this.$bvModal
        .msgBoxConfirm("Please confirm that you want to delete signer.", {
          title: "Delete Signer",
          size: "sm",
          buttonSize: "sm",
          okVariant: "danger",
          okTitle: "YES",
          cancelTitle: "NO",
          footerClass: "p-2",
          hideHeaderClose: false,
          centered: true,
        })
        .then((value) => {
          if (value) {
            this.$store
              .dispatch(DELETE_SIGNER, id)
              .then(() => {
                console.log("berhasil");
              })
              .catch((response) => {
                console.log(response);
              });
          }
        })
        .catch(() => {
          // An error occurred
        });
    },
    onSubmit(values) {
      const inputs = {
        ...values,
        npwp: values.npwp.replace(/\./g, "").replace(/-/g, ""),
      };

      if (this.isCreated) {
        this.$store
          .dispatch(CREATE_SIGNER, inputs)
          .then(() => {
            console.log("berhasil");
          })
          .catch(() => {
            console.log("error");
          });
      } else {
        this.$store
          .dispatch(UPDATE_SIGNER, inputs)
          .then(() => {
            console.log("berhasil");
          })
          .catch(() => {
            console.log("error");
          });
      }
      this.$refs["form-modal"].hide();
    },
  },
};
</script>
© 2021 GitHub, Inc.
