<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md p-8 space-y-4 bg-white rounded-lg shadow-md">
      <h1 class="text-2xl font-bold text-center text-gray-700">Inscription</h1>

      <div  class="space-y-4">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-600"
            >Email</label
          >
          <input
            type="email"
            v-model="email"
            class="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-gray-600"
            >Mot de passe</label
          >
          <input
            type="password"
            v-model="password"
            class="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          @click="submitForm()"
          class="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          S'inscrire
        </button>
      </div>

      <p v-if="errorMessage" class="mt-4 text-sm text-center text-red-500">
        {{ errorMessage }}
      </p>

      <button
        @click="goToLogin"
        class="w-full px-4 py-2 mt-4 font-bold text-blue-500 border border-blue-500 rounded hover:bg-blue-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Se connecter
      </button>
    </div>
  </div>
</template>

<script>


export default {
  data() {
    return {
      email: "",
      password: "",
      errorMessage: "",
    };
  },
  methods: {
    async submitForm() {
      
      try {
        const response = await fetch(
          `http://localhost:3000/api/createUser`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: this.email, password: this.password }),
          }
        );

        const data = await response.json();
        console.log(data)

        if (response.ok ) {
          this.$router.push("./login"); 
        } else {
          this.errorMessage = data.message || "Une erreur s'est produite.";
        }
      } catch (error) {
        this.errorMessage = "Erreur d'inscription, veuillez réessayer.";
      }
    },

    goToLogin() {
      this.$router.push("./login"); 
    },
  },
};
</script>

<style scoped>
.signup-container {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
}
.error {
  color: red;
  margin-top: 10px;
}
</style>
