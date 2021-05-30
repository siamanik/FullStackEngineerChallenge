<template>
  <v-dialog
    v-model="dialog"
    persistent
    max-width="600px"
  >
    <v-card v-if="dialog">
      <v-card-title>
        <span class="headline">Review</span>
      </v-card-title>
      <v-card-text>
        <v-form
          ref="form"
          lazy-validation
        >
          <v-row>
            <v-col cols="12">
              <v-text-field
                :value="feedbackFor.employee.name"
                label="Review for"
                disabled
                required
              />
            </v-col>
            <v-col cols="12">
              <v-textarea
                :value="feedback.review.question"
                label="Review question"
                disabled
              />
            </v-col>
            <v-col cols="12">
              <v-textarea
                v-model="formData.answer"
                label="Review answer*"
                :rules="validations.answerRules"
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
    feedback: {
      type: Object,
      default: () => {
        return {}
      }
    },
    feedbackFor: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data: () => ({
    formData: {
      amswer: ''
    },
    validations: {
      answerRules: [
        v => !!v || 'Question is required'
      ]
    }
  }),
  methods: {
    init () {
      this.formData = {
        question: ''
      }
      if (this.$refs.form) this.$refs.form.resetValidation()
    },
    submit () {
      this.$emit('update', this.feedback.id, this.formData)
    }
  }
}
</script>
