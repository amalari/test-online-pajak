<template>
  <ValidationObserver ref="observer">
    <b-form
      slot-scope="{ validate }"
      @submit.prevent="onSubmit(validate)"
      novalidate
    >
      <ValidationProvider rules="required|length:20" name="NPWP">
        <b-form-group
          slot-scope="{ valid, errors }"
          id="input-group-1"
          label="NPWP"
        >
          <b-form-input
            v-model="form.npwp"
            v-mask="'##.###.###.#-###.###'"
            type="text"
            :state="errors[0] ? false : valid ? true : null"
          />
          <b-form-invalid-feedback>
            {{ errors[0] }}
          </b-form-invalid-feedback>
        </b-form-group>
      </ValidationProvider>
      <ValidationProvider rules="required" name="Nama Penandatangan SPT">
        <b-form-group
          slot-scope="{ valid, errors }"
          id="input-group-2"
          label="Nama Penandatangan SPT *"
        >
          <b-form-input
            :state="errors[0] ? false : valid ? true : null"
            v-model="form.name"
            type="text"
            required
          />
          <b-form-invalid-feedback>
            {{ errors[0] }}
          </b-form-invalid-feedback>
        </b-form-group>
      </ValidationProvider>
      <ValidationProvider rules="required" name="Bertindak sebagai">
        <b-form-group
          slot-scope="{ valid, errors }"
          label="Bertindak sebagai *"
        >
          <b-form-radio-group
            id="radio-group-1"
            v-model="form.signatory"
            :state="errors[0] ? false : valid ? true : null"
            :options="[
              { text: 'Wajib Pajak', value: 'TAXPAYER' },
              { text: 'Kuasa', value: 'AUTHORIZED_REPRESENTATIVE' },
            ]"
            name="signatory"
          />
          <b-form-invalid-feedback
            :state="errors[0] ? false : valid ? true : null"
          >
            {{ errors[0] }}
          </b-form-invalid-feedback>
        </b-form-group>
      </ValidationProvider>
      <ValidationProvider rules="required" name="Status Wajib Pajak">
        <b-form-group
          label="Status Wajib Pajak *"
          slot-scope="{ valid, errors }"
        >
          <b-form-radio-group
            id="radio-group-2"
            v-model="form.statusTaxpayer"
            :state="errors[0] ? false : valid ? true : null"
            :options="[
              { text: 'Aktif', value: 'ACTIVE' },
              { text: 'Tidak Aktif', value: 'NOT_ACTIVE' },
            ]"
            name="statusTaxpayer"
          />
          <b-form-invalid-feedback
            :state="errors[0] ? false : valid ? true : null"
          >
            {{ errors[0] }}
          </b-form-invalid-feedback>
        </b-form-group>
      </ValidationProvider>

      <b-form-checkbox
        v-model="form.defaultSignatory"
        name="defaultSignatory"
        value="true"
        unchecked-value="false"
      >
        Jadikan sebagai default
      </b-form-checkbox>
      <b-button type="submit" size="sm" class="float-right" variant="primary"
        >Submit</b-button
      >
      <b-button
        @click="$emit('onCancel')"
        variant="danger"
        size="sm"
        class="float-right"
        >Batal</b-button
      >
    </b-form>
  </ValidationObserver>
</template>

<script>
import { ValidationObserver, ValidationProvider } from "vee-validate";
export default {
  props: ["isCreated"],
  data() {
    return {
      form: {
        npwp: "",
        name: "",
        defaultSignatory: false,
        statusTaxpayer: "",
        signatory: "",
      },
    };
  },
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  created() {
    if (!this.isCreated) this.form = this.$store.getters.signer;
  },
  methods: {
    onSubmit(validate) {
      validate().then((isValid) => {
        console.log(this.form.npwp.length);
        if (isValid) this.$emit("onSubmit", this.form);
      });
    },
  },
};
</script>
