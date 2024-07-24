<!-- src/views/Dashboard.vue -->
<template>
    <div class="flex min-h-screen flex-col bg-white bg-gradient-to-r from-[#FCF1F4] to-[#EDFBF9] font-mulish text-base font-normal text-gray antialiased dark:bg-[#101926] dark:from-transparent dark:to-transparent">
        <header id="top-header" class="sticky top-0 z-50 bg-black transition duration-300">
          <div class="container">
              <div class="flex items-center justify-between py-5 lg:py-0">
                  
                  <a class="cursor-pointer h-10 text-4xl text-secondary" href="/app/dashboard" >Dashboard</a>
                  <div class="flex items-center">
                      <div onclick="toggleMenu()" class="overlay fixed inset-0 z-[51] hidden bg-black/60 lg:hidden"></div>
                          <div class="menus">
                              <div class="border-b border-gray/10 ltr:text-right rtl:text-left lg:hidden">
                                  <button onclick="toggleMenu()" type="button" class="p-4">
                                      <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                          stroke-width="1.5"
                                          stroke="currentColor"
                                          class="h-6 w-6 text-black dark:text-white"
                                      >
                                          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                      </svg>
                                  </button>
                              </div>
                              <ul>
                                  <li><a class="cursor-pointer" @click="showComponent('Logs')">Logs</a></li>
                                  
                                  <li>
                                      <a class="cursor-pointer" @click="showComponent('Alerts')">Alerts</a>
                                  </li>
                                  <li>
                                      <a class="cursor-pointer" @click="showComponent('IbmResponses')">IBM Responses</a>
                                  </li>
                                  <li>
                                      <a class="cursor-pointer" @click="logout">Logout</a>
                                  </li>                                    
                                
                              </ul>
                          </div>                  
                          <button type="button" class="flex h-10 w-10 items-center justify-center rounded-full bg-primary lg:hidden" onclick="toggleMenu()">
                              <svg width="22" height="18" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg" class="text-white">
                                  <path
                                      d="M2 15H11C11.552 15 12 15.447 12 16C12 16.553 11.552 17 11 17H2C1.448 17 1 16.553 1 16C1 15.447 1.448 15 2 15Z"
                                      fill="currentColor"
                                  />
                                  <path
                                      d="M2 8H20C20.552 8 21 8.447 21 9C21 9.553 20.552 10 20 10H2C1.448 10 1 9.553 1 9C1 8.447 1.448 8 2 8Z"
                                      fill="currentColor"
                                  />
                                  <path
                                      d="M21 2C21 1.447 20.552 1 20 1H7C6.448 1 6 1.447 6 2C6 2.553 6.448 3 7 3H20C20.552 3 21 2.553 21 2Z"
                                      fill="currentColor"
                                  />
                              </svg>
                          </button>
                      </div>
              </div>
          </div>
        </header>

        <div v-if="!currentView">
          <section class="bg-gradient-to-t from-white/50 to-transparent py-16 dark:from-white/[0.02]">
            <div class="container">
                <div class="grid items-center gap-10 md:grid-cols-2">
                    <div class="text-center text-lg font-medium md:ltr:text-left md:rtl:text-right">
                        <h2 class="mb-3 text-3xl font-black leading-normal text-black dark:text-white md:text-[40px]">
                            Making Complex Digital Products
                        </h2>
                        <p>
                            In publishing and graphic design, Lorem ipsum is a text commonly used to demonstrate the visual form of a document or a
                            typeface without relying on meaningful content.
                        </p>
                        <div class="mt-8">
                            <a href="javascript:" class="bg-secondary py-3 px-5 font-bold text-white transition hover:bg-primary">Explore</a>
                        </div>
                    </div>
                    <div>
                        <img
                            src="../../assets/net.png"
                            alt=""
                            class="h-full w-full object-cover rtl:rotate-y-180"
                        />
                    </div>
                </div>
            </div>
          </section>

          <section class="bg-gradient-to-t from-white/50 to-transparent py-14 dark:from-white/[0.02] md:py-20">
                <div class="container">
                    <div class="mb-10">
                        <h6 class="mb-4 text-lg font-extrabold uppercase text-secondary">network logs</h6>
                        <h2 class="text-3xl font-black leading-tight text-black dark:text-white md:text-[40px]">List of available network logs</h2>
                    </div>
                    <div class="grid gap-[30px] sm:grid-cols-2 lg:grid-cols-3">
                        <div>
                            <div
                                class="relative border-[2px] border-white bg-gradient-to-b from-white/50 to-transparent p-5 shadow-[-20px_30px_70px_rgba(219,222,225,0.4)] transition hover:border-secondary/50 hover:bg-secondary/20 dark:border-[rgba(119,128,161,0.15)] dark:bg-black dark:from-transparent dark:shadow-none dark:hover:border-secondary/50 dark:hover:bg-secondary/10 md:p-8"
                            >
                                <a href="javascript:" class="absolute inset-0 h-full w-full"></a>
                                
                                <h5 class="pt-7 pb-3 text-[22px] font-bold text-black dark:text-white">UI/UX Design</h5>
                                <p class="text-lg leading-loose line-clamp-3">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                            </div>
                        </div>
                        <div>
                            <div
                                class="relative border-[2px] border-white bg-gradient-to-b from-white/50 to-transparent p-5 shadow-[-20px_30px_70px_rgba(219,222,225,0.4)] transition hover:border-secondary/50 hover:bg-secondary/20 dark:border-[rgba(119,128,161,0.15)] dark:bg-black dark:from-transparent dark:shadow-none dark:hover:border-secondary/50 dark:hover:bg-secondary/10 md:p-8"
                            >
                                <a href="javascript:" class="absolute inset-0 h-full w-full"></a>
                                
                                <h5 class="pt-7 pb-3 text-[22px] font-bold text-black dark:text-white">Product Design</h5>
                                <p class="text-lg leading-loose line-clamp-3">
                                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
                                </p>
                            </div>
                        </div>
                        <div>
                            <div
                                class="relative border-[2px] border-white bg-gradient-to-b from-white/50 to-transparent p-5 shadow-[-20px_30px_70px_rgba(219,222,225,0.4)] transition hover:border-secondary/50 hover:bg-secondary/20 dark:border-[rgba(119,128,161,0.15)] dark:bg-black dark:from-transparent dark:shadow-none dark:hover:border-secondary/50 dark:hover:bg-secondary/10 md:p-8"
                            >
                                <a href="javascript:" class="absolute inset-0 h-full w-full"></a>
                               
                                <h5 class="pt-7 pb-3 text-[22px] font-bold text-black dark:text-white">Motion Graphics</h5>
                                <p class="text-lg leading-loose line-clamp-3">
                                    When an unknown printer took a galley of type and scrambled it to make a type specimen book.
                                </p>
                            </div>
                        </div>                       
                    </div>
                </div>
          </section>
        </div>

        <component :is="currentView" v-if="currentView"></component>
       
    </div>
</template>

<script>
import Logs from '../../views/dashboard/Logs.vue';
import Alerts from '../../views/dashboard/Alerts.vue';
import IbmResponses from '../../views/dashboard/IbmResponses.vue';


export default {
  name: "Dashboard",
  data() {
    return {
      currentView: null,
    };
  },

  methods: {
    showComponent(view) {
      this.currentView = view;
    },
    logout(){
      localStorage.removeItem('token');
      this.$router.push('/app/signin');
    }
  },
  components: {
    Logs,
    Alerts,
    IbmResponses,

  },
};
</script>

<style scoped>

</style>
