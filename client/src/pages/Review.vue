<template>
  <v-card
    class="mx-auto"
  >
    <ReviewFrom
      :dialog="dialog"
      :mode="mode"
      :employees="employees"
      :review="review"
      @close="closeDialog"
      @create="create"
      @update="update"
    />
    <AssignForm
      :dialog="assignDialog"
      :employees="employees"
      :feedbacks="feedbacks"
      :review="review"
      @close="closeAssignDialog"
      @assign="performAssign"
    />
    <v-toolbar>
      <v-toolbar-title>List of all reviews</v-toolbar-title>
      <v-spacer />
      <v-btn
        color="primary"
        dark
        @click="openDialog('create')"
      >
        Add new<v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-toolbar>

    <v-list>
      <v-list-item
        v-for="review in reviews"
        :key="review.id"
        two-line
      >
        <v-list-item-avatar>
          <v-icon
            class="primary lighten-1"
            dark
          >
            mdi-text
          </v-icon>
        </v-list-item-avatar>

        <v-list-item-content v-if="review.employee">
          <v-list-item-title v-text="review.employee.name" />
          <v-list-item-subtitle v-text="review.question" />
        </v-list-item-content>
        <v-list-item-content v-else>
          <v-list-item-title
            class="red--text"
            v-text="'Employee account deleted...'"
          />
        </v-list-item-content>

        <v-list-item-action
          v-if="review.employee"
        >
          <v-row>
            <v-col>
              <v-btn
                color="orange"
                dark
                @click="assignForm(review)"
              >
                Assign
              </v-btn>
            </v-col>
            <v-col>
              <v-btn
                color="primary"
                dark
                @click="openDialog('view', review)"
              >
                View
              </v-btn>
            </v-col>
            <v-col>
              <v-btn
                color="green"
                dark
                @click="openDialog('update', review)"
              >
                Update
              </v-btn>
            </v-col>
            <v-col>
              <v-btn
                color="red"
                dark
                @click="destroy(review.id)"
              >
                Delete
              </v-btn>
            </v-col>
          </v-row>
        </v-list-item-action>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
import ReviewFrom from '@/components/Review/CrudForm.vue'
import AssignForm from '@/components/Review/AssignForm.vue'
import ReviewApi from '@/api/review'
import EmployeeApi from '@/api/employee'
import FeedbackApi from '@/api/feedback'

export default {
  components: {
    ReviewFrom,
    AssignForm
  },
  data: () => ({
    mode: 'create',
    dialog: false,
    assignDialog: false,
    reviews: [],
    employees: [],
    review: {
      question: '',
      employeeId: null
    },
    feedbacks: []
  }),
  created () {
    this.init()
  },
  methods: {
    init () {
      ReviewApi.index().then(result => {
        this.reviews = result.data
      })
      EmployeeApi.index().then(result => {
        this.employees = result.data
      })
    },

    //
    // Assign related methods
    //
    assignForm (review) {
      this.review = review
      const params = {
        reviewId: review.id
      }
      FeedbackApi.find(params).then(result => {
        this.feedbacks = result.data
      })
      this.assignDialog = true
    },

    performAssign (params) {
      FeedbackApi.store(params).then(result => {
        this.assignForm(this.review)
      })
    },
    closeAssignDialog () {
      this.assignDialog = false
    },

    //
    // review CRUD related methods
    //
    openDialog (mode, review = this.review) {
      this.mode = mode
      this.review = review
      this.dialog = true
    },
    closeDialog () {
      this.dialog = false
    },
    create (formData) {
      ReviewApi.store(formData).then(result => {
        this.closeDialog()
        this.init()
      })
    },
    update (formData) {
      ReviewApi.update(formData.id, formData).then(result => {
        this.closeDialog()
        this.init()
      })
    },
    destroy (id) {
      ReviewApi.destroy(id).then(result => {
        this.init()
      })
    }
  }
}
</script>
