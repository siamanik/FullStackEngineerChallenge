<template>
  <v-card
    class="mx-auto"
  >
    <EmployeeFrom
      :dialog="dialog"
      :mode="mode"
      :employee="employee"
      @close="closeDialog"
      @create="create"
      @update="update"
    />
    <v-toolbar>
      <v-toolbar-title>List of all employees</v-toolbar-title>
      <v-spacer />
      <v-btn
        id="newEmployee"
        color="primary"
        dark
        @click="openDialog('create')"
      >
        Add new<v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-toolbar>

    <v-list>
      <v-list-item
        v-for="employee in employees"
        :key="employee.id"
        class="employeeListItem"
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

        <v-list-item-action>
          <v-row>
            <v-col>
              <v-btn
                color="primary"
                dark
                @click="openDialog('view', employee)"
              >
                View
              </v-btn>
            </v-col>
            <v-col>
              <v-btn
                color="green"
                dark
                @click="openDialog('update', employee)"
              >
                Update
              </v-btn>
            </v-col>
            <v-col>
              <v-btn
                color="red"
                class="employeeDelete"
                :dark="!employee.admin"
                :disabled="employee.admin"
                @click="destroy(employee.id)"
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
import EmployeeFrom from '@/components/Employee/CrudForm.vue'
import EmployeeApi from '@/api/employee'
export default {
  components: {
    EmployeeFrom
  },
  data: () => ({
    mode: 'create',
    dialog: false,
    employees: [],
    employee: {
      name: '',
      email: '',
      password: '',
      admin: false
    }
  }),
  created () {
    this.init()
  },
  methods: {
    init () {
      EmployeeApi.index().then(result => {
        this.employees = result.data
      })
    },
    openDialog (mode, employee = this.employee) {
      this.mode = mode
      this.employee = employee
      this.dialog = true
    },
    closeDialog () {
      this.dialog = false
    },
    create (formData) {
      EmployeeApi.store(formData).then(result => {
        this.closeDialog()
        this.init()
      })
    },
    update (formData) {
      EmployeeApi.update(formData.id, formData).then(result => {
        this.closeDialog()
        this.init()
      })
    },
    destroy (id) {
      EmployeeApi.destroy(id).then(result => {
        this.init()
      })
    }
  }
}
</script>
