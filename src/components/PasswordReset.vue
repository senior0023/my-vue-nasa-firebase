<template>
    <div class="modal">
        <div class="modal-content">
            <div @click="$emit('close')" class="close">close</div>
            <h3>Reset Password</h3>
            <div v-if="!showSuccess">
                <p> Enter your email to reset your password</p>
                <form @submit.prevent>
                    <input v-model.trim="email" type="email" placeholder="you@email.com"/>
                </form>
                <p v-if="errorMsg !== ''" class="error">{{ errorMsg }}</p>
                <button @click="resetPassword()" class="button">Reset</button>
            </div>
            <p v-else>Success! Please check your email.</p>
        </div>    
    </div>
</template>

<script>
    import { auth_user } from '@/firebase'

    export default {
        data() {
            return {
                errorMsg: '',
                email: '',
                showSuccess: false
            }
        },
        methods: {
            async resetPassword() {
                // reset error message
                this.errorMsg = ''

                try {
                    await auth_user.sendPasswordResetEmail(this.email)
                    this.showSuccess = true
                } catch (err) {
                    this.errorMsg = err.message
                }
            }
        }
    }
</script>