// in this Todo.vue file I have used local storage to save the data

<template>
<div class="home pa-6">

    <v-text-field
              v-model="newTaskTitle"
              @click:append="addTask"
              @keyup.enter="addTask"
              outlined
              class="pa-3"
              label="Add Task"
              append-icon="mdi-plus"
              hide-details
              clearable
            >
    </v-text-field>

  <v-list
      two-line
      subheader
    >

      
    </v-list>

    <v-divider></v-divider>

    <v-list
      flat
      class="pt-0"
    >
      

      <v-list-item-group
        
        multiple
      >
        <div v-for="task in tasks" :key='task.ids'>
          <v-list-item :class="{ 'green lighten-2' : task.done }" @click="doneTask(task.id)" >
            <template v-slot:default>
              <v-list-item-action>
                <v-checkbox
                  :input-value="task.done"
                  color="primary"
                ></v-checkbox>
              </v-list-item-action>

              <v-list-item-content>
                <v-list-item-title
                :class="{ 'text-decoration-line-through': task.done }"
                >
                {{ task.title }} </v-list-item-title>
              </v-list-item-content>
              <v-list-item-action>
                <v-btn 
                icon
                @click.stop="deleteTask(task.id)"
                >
                  <v-icon color="primary lighten-1">mdi-delete</v-icon>
                </v-btn>
              </v-list-item-action>
            </template>
            
          </v-list-item>
          <v-divider></v-divider>
        </div>
      </v-list-item-group>
    </v-list>

    <v-snackbar v-model="snackbar" :timeout="3000" bottom color="success"  >
        <span>Task Added</span>
        <v-btn text  color='white' @click="snackbar = false" absolute right >Close</v-btn>
    </v-snackbar>

</div>
</template>

<script>

  export default {
    name: 'Home',

    data(){
      return {
        newTaskTitle : '',
        snackbar: false,
        tasks: []
      }
    },
    mounted(){
      if (localStorage.getItem('tasks')) {
      try {
        this.tasks = JSON.parse(localStorage.getItem('tasks'));
      } catch(e) {
        console.log('Error Occured');
      }
    }
    },
    watch: {
      tasks: {
        handler(newTasks){ 
          localStorage.tasks = JSON.stringify(newTasks)
        }
      }
    }
    ,
    methods:{
      addTask(){
        this.snackbar = true
        let newTask = {
          id: Date.now(),
          title: this.newTaskTitle,
          done: false,
        }
        this.tasks.push(newTask)
        this.newTaskTitle = ''
        const parsed = JSON.stringify(this.tasks);
        localStorage.setItem('tasks', parsed);
      },

      doneTask(id){
        let task = this.tasks.filter( task => task.id === id)[0]
        task.done = !task.done
        const parsed = JSON.stringify(this.tasks);
        localStorage.setItem('tasks', parsed);
      },
      deleteTask(id){
        this.tasks = this.tasks.filter(task => task.id !== id)
      }
    }
  }
</script>
