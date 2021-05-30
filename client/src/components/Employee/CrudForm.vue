<template>
  <v-dialog
    v-model="dialog"
    persistent
    max-width="600px"
  >
    <v-card>
      <v-card-title>
        <span class="headline">Employee</span>
      </v-card-title>
      <v-card-text>
        <v-form
          ref="form"
          :readonly="mode === 'view'"
          lazy-validation
        >
          <v-row>
            <v-col cols="12">
              <v-text-field
                id="employeeName"
                v-model="formData.name"
                label="Full name*"
                :rules="validations.nameRules"
                required
              />
            </v-col>
            <v-col cols="6">
              <v-text-field
                id="employeeEmail"
                v-model="formData.email"
                label="Email*"
                :rules="validations.emailRules"
                type="email"
                required
              />
            </v-col>
            <v-col cols="6">
              <v-text-field
                id="employeePassword"
                v-model="formData.password"
                label="Password*"
                type="password"
                :rules="validations.passwordRules"
                required
              />
            </v-col>
            <v-col
              cols="12"
            >
              <v-checkbox
                v-model="formData.admin"
                label="is admin?"
                required
              />
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          color="red darken-1"
          text
          @click="$emit('close')"
        >
          Close
        </v-btn>
        <v-btn
          v-if="mode != 'view'"
          id="employeeCreate"
          color="green darken-1"
          text
          @click="submit()"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    dialog: {
      type: Boolean,
      default: false
    },
    mode: {
      type: String,
      default: 'create'
    },
    employee: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data: () => ({
    formData: {
      name: '',
      email: '',
      password: '',
      admin: false
    },
    validations: {
      nameRules: [
        v => !!v || 'Name is required'
      ],
      passwordRules: [
        v => (v && v.length >= 6) || 'Password must be more than 5 characters'
      ],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
      ]
    }
  }),
  watch: {
    dialog (newVal) {
      if (newVal && this.mode !== 'create') {
        this.formData = { ...this.employee }
        this.formData.password = ''
      } else {
        this.init()
      }
    }
  },
  methods: {
    init () {
      this.formData = {
        name: '',
        email: '',
        password: '',
        admin: false
      }
      if (this.$refs.form) this.$refs.form.resetValidation()
    },
    submit () {
      if (this.$refs.form.validate()) {
        if (this.mode === 'create') this.$emit('create', this.formData)
        if (this.mode === 'update') this.$emit('update', this.formData)
        this.init()
      }
    }
  }
}
</script>
