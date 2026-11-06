import { Webhook } from "svix"
import User from "../models/User.js"
export const clerkWebhooks = async (req, res) => {
    console.log(req, 'req')
    try {
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET)
        console.log(whook)
        await whook.verify(JSON.stringify(req.body), {
            'svix-id': req.headers['svix-id'],
            'svix-timestamp': req.headers['svix-timestamp'],
            'svix-signature':req.headers['svix-signature']
        })
        // console.log('verify', verify)
        // const { data, type } = req.body
        // console.log(data, 'data')
        // switch (type) {
        //     case 'user.created': {
        //         const userData = {
        //             _id: 'test',
        //             email: 'test',
        //             name: '',
        //             image: '',
        //             resume:''
        //         }
                
        //         await User.create(userData)
        //         res.json({})
        //         break;
        //     }
        //     default:
        //         break;
        // }
    } catch (error) {
        console.log(error.message)
        res.json({success:false, message:'webhooks error'})
    }
}

// import { Webhook } from "svix"
// import User from "../models/User.js"
// export const clerkWebhooks = async (req, res) => {
//     console.log(req, 'req')
//     try {
//         const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET)
//         console.log(whook)
//         await whook.verify(JSON.stringify(req.body), {
//             'svix-id': req.headers['svix-id'],
//             'svix-timestamp': req.headers['svix-timestamp'],
//             'svix-signature':req.headers['svix-signature']
//         })
//         console.log('verify', verify)
//         const { data, type } = req.body
//         console.log(data, 'data')
//         switch (type) {
//             case 'user.created': {
//                 const userData = {
//                     _id: data.id,
//                     email: data.email_addresses[0].email_address,
//                     name: data.first_name + ' ' + data.last_name,
//                     image: data.image_url,
//                     resume:''
//                 }
//                 await User.create(userData)
//                 res.json({})
//                 break;
//             }
//             case 'user.updated': {
//                 const userData = {
//                     email: data.email_addresses[0].email_address,
//                     name: data.first_name + ' ' + data.last_name,
//                     image:data.image_url
//                 }
//                 await User.findByIdAndUpdate(data.id, userData)
//                 res.json({})
//                 break;
//             }
//             case 'user.deleted': {
//                 await User.findByIdAndDelete(data.id)
//                 res.json({})
//                 break;
//             }
//             default:
//                 break;
//         }
//     } catch (error) {
//         console.log(error.message)
//         res.json({success:false, message:'webhooks error'})
//     }
// }



        // const webhookSecret = process.env.CLERK_WEBHOOK_SECRET
        // console.log(webhookSecret, 'webhooksecret')
        // if (!webhookSecret) {
        //     throw new Error('missing CLERK_WEBHOOK_SECRET environment variable')
        // }
        // const svix_id = request.headers.get('svix-id')
        // // console.log('svix-id', svix_id)
        // const svix_signature = request.headers.get('svix-signature')
        // // console.log('svix-signature', svix_signature)
        // const svix_timestamp = request.headers.get('svix-timestamp')
        // // console.log('svix-timestamp', svix_timestamp)
        // if (!svix_id || !svix_signature || !svix_timestamp) {
        //     return new Response('error occurred no svix headers', {
        //         status:400
        //     })
        // }
        // const payload = await request.json()
        
        // const body = JSON.stringify(payload)
        
        // const wh = new Webhook(webhookSecret)
        // let evt: any
        // try {
        //     evt = wh.verify(body, {
        //         'svix-id': svix_id,
        //         'svix-timestamp': svix_timestamp,
        //         'svix-signature':svix_signature
        //     }) as any

        
        // } catch (error) {
        //     console.error('error verifying webhook', error)
        //   return new Response('error occurred', {status:400})  
        // }