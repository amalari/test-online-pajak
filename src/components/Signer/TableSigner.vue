<template>
  <div>
    <h4 class="mr-2 mb-2 float-left">
      Tambah dan edit daftar Penandatanganan SPT anda
    </h4>
    <b-button
      @click="$emit('onCreated')"
      size="sm"
      variant="danger"
      class="mr-2 mb-2 float-right"
    >
      Tambah
    </b-button>
    <b-table hover :items="items" :fields="fields">
      <template #cell(actions)="row">
        <b-button @click="$emit('onEdit', row.item.id)" size="sm" class="mr-2">
          Edit
        </b-button>
        <b-button
          @click="$emit('onDelete', row.item.id)"
          size="sm"
          class="mr-2"
          variant="danger"
        >
          Delete
        </b-button>
      </template>
    </b-table>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "TableSigner",
  computed: {
    ...mapGetters(["signers"]),
    items: function() {
      const npwpFormatter = (str) => {
        let result = "";
        const dotIndexs = [1, 4, 7, 11];
        const slashIndexs = [8];
        for (let i = 0; i < str.length; i++) {
          result += str[i];
          if (dotIndexs.includes(i)) result += ".";
          if (slashIndexs.includes(i)) result += "-";
        }
        return result;
      };
      return this.signers.map((signer) => ({
        id: signer.id,
        NPWP: npwpFormatter(signer.npwp),
        Nama: signer.name,
        sebagai: signer.signatory === "TAXPAYER" ? "Wajib Pajak" : "Kuasa",
        status: signer.statusTaxpayer === "ACTIVE" ? "Aktif" : "Tidak Aktif",
        default: signer.defaultSignatory ? "Ya" : "Tidak",
      }));
    },
  },
  data() {
    return {
      fields: ["NPWP", "Nama", "sebagai", "status", "default", "actions"],
    };
  },
};
</script>
