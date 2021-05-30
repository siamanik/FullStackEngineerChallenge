<template>
  <v-dialog
    v-model="dialog"
    persistent
    max-width="600px"
  >
    <v-card>
      <v-card-title>
        <span class="headline">Review</span>
      </v-card-title>
      <v-card-text>
        <v-form
          ref="form"
          :readonly="mode === 'view'"
          lazy-validation
        >
          <v-row>
            <v-col cols="12">
              <v-select
                v-model="formData.employeeId"
                :items="employees"
                :rules="validations.employeeIdRules"
                item-value="id"
                item-text="name"
                label="Select Employee"
              />
            </v-col>
            <v-col cols="12">
              <v-textarea
                v-model="formData.question"
                label="Review question*"
                :rules="validations.questionRules"
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
    review: {
      type: Object,
      default: () => {
        return {}
      }
    },
    employees: {
      type: Array,
      default: () => []
    }
  },
  data: () => ({
    formData: {
      question: '',
      employeeId: null
    },
    validations: {
      questionRules: [
        v => !!v || 'Question is required'
      ],
      employeeIdRules: [
        v => !!v || 'ID is required'
      ]
    }
  }),
  watch: {
    dialog (newVal) {
      if (newVal && this.mode !== 'create') {
        this.formData = { ...this.review }
      } else {
        this.init()
      }
    }
  },
  methods: {
    init () {
      this.formData = {
        question: ''
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
