<template>
    <div class="min-h-screen bg-gray-100 p-8">
      <h1 class="text-3xl font-bold text-center mb-8">Liste des Utilisateurs</h1>
      <div v-if="errorMessage" class="text-red-500 text-center mb-4">{{ errorMessage }}</div>
      <div v-else-if="users.length === 0" class="text-center">Aucun utilisateur trouvé.</div>
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div v-for="user in users" :key="user.id" class="p-4 bg-white shadow rounded">
          <p><strong>ID :</strong> {{ user.id }}</p>
          <p><strong>Email :</strong> {{ user.email }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        users: [],
        errorMessage: '',
      };
    },
    async created() {
      await this.fetchUsers();
    },
    methods: {
      async fetchUsers() {
        try {
          const token = localStorage.getItem('token'); 
          const response = await fetch(`http://localhost:3000/api/users`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`, 
              'Content-Type': 'application/json',
            },
          });
  
          if (response.ok) {
            const data = await response.json();
            this.users = data; 
          } else {
            this.errorMessage = "Vous avez pas les droits d'acces";
          }
        } catch (error) {
          this.errorMessage = "Une erreur s'est produite lors de la récupération des utilisateurs.";
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .min-h-screen {
    min-height: 100vh;
  }
  </style>
  