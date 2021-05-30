<template>
  <v-dialog
    v-model="dialog"
    persistent
    max-width="600px"
  >
    <v-card v-if="dialog">
      <v-card-title>
        <span class="headline">Review For: {{ review.employee.name }}</span>
      </v-card-title>
      <v-card-text>
        <v-list>
          <template
            v-for="employee in employees"
          >
            <v-list-item
              v-if="employee.id != review.employee.id"
              :key="employee.id"
            >
              <v-list-item-avatar>
                <v-icon
                  class="primary lighten-1"
                  dark
                >
                  mdi-account
                </v-icon>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title v-text="employee.name" />
              </v-list-item-content>

              <v-list-item-content v-if="isSubmitted(employee)">
                <v-list-item-title v-text="getAnswer(employee)" />
              </v-list-item-content>

              <v-list-item-action>
                <v-row>
                  <v-col>
                    <v-btn
                      color="orange"
                      dark
                      :disabled="isAlreadyAssigned(employee)"
                      @click="submit(employee)"
                    >
                      Assign
                    </v-btn>
                  </v-col>
                </v-row>
              </v-list-item-action>
            </v-list-item>
          </template>
        </v-list>
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
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import _ from 'lodash'

export default {
  props: {
    dialog: {
      type: Boolean,
      default: false
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
    },
    feedbacks: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    isSubmitted (employee) {
      const result = _.find(this.feedbacks, function (f) {
        if (f.employeeId === employee.id) {
          return true
        }
      })
      return result ? result.submit : false
    },
    isAlreadyAssigned (employee) {
      const result = _.find(this.feedbacks, function (f) {
        if (f.employeeId === employee.id) {
          return true
        }
      })
      return !!result
    },
    getAnswer (employee) {
      const result = _.find(this.feedbacks, function (f) {
        if (f.employeeId === employee.id) {
          return true
        }
      })
      return result !== null ? 'Review: ' + result.answer : ''
    },
    submit (employee) {
      var params = {
        employeeId: employee.id,
        reviewId: this.review.id
      }
      this.$emit('assign', params)
    }
  }
}
</script>
