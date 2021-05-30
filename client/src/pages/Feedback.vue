<template>
  <v-card
    class="mx-auto"
  >
    <FeedbackForm
      :dialog="dialog"
      :feedback="feedback"
      :feedback-for="feedbackFor"
      @close="closeDialog"
      @update="update"
    />
    <v-toolbar>
      <v-toolbar-title>Reviews require feedback</v-toolbar-title>
    </v-toolbar>

    <v-list>
      <v-list-item
        v-for="feedback in feedbacks"
        :key="feedback.id"
        two-line
      >
        <v-list-item-avatar>
          <v-icon
            class="primary lighten-1"
            dark
          >
            mdi-file-edit
          </v-icon>
        </v-list-item-avatar>

        <v-list-item-content v-if="feedback.review">
          <v-list-item-subtitle v-text="feedback.review.question" />
        </v-list-item-content>
        <v-list-item-content v-else>
          <v-list-item-title
            class="red--text"
            v-text="'Review deleted...'"
          />
        </v-list-item-content>

        <v-list-item-action v-if="feedback.review">
          <v-btn
            color="green"
            dark
            @click="openDialog(feedback)"
          >
            Feedback
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
import FeedbackForm from '@/components/Feedback/Form.vue'
import FeedbackApi from '@/api/feedback'
import ReviewApi from '@/api/review'

export default {
  components: {
    FeedbackForm
  },
  data: () => ({
    dialog: false,
    feedbacks: [],
    feedback: {},
    feedbackFor: {}
  }),
  created () {
    this.init()
  },
  methods: {
    init () {
      FeedbackApi.index().then(result => {
        this.feedbacks = result.data
      })
    },
    openDialog (feedback) {
      this.feedback = feedback
      ReviewApi.find({ id: feedback.reviewId }).then(result => {
        this.feedbackFor = result.data
        this.dialog = true
      })
    },
    closeDialog () {
      this.dialog = false
    },
    update (id, params) {
      FeedbackApi.update(id, params).then(result => {
        this.closeDialog()
        this.init()
      })
    }
  }
}
</script>
