import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock, MessageSquare } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, { message: "Le nom doit contenir au moins 2 caractères." }),
  email: z.string().email({ message: "Veuillez entrer une adresse email valide." }),
  subject: z.string().min(1, { message: "Veuillez sélectionner un sujet." }),
  message: z.string().min(10, { message: "Le message doit contenir au moins 10 caractères." }),
});

type FormData = z.infer<typeof formSchema>;

// Interface pour la réponse attendue de l'API après la création
interface ContactApiResponse {
  _id: string;
  nom: string;
  email: string;
  sujet: string;
  message: string;
  statut: string;
  createdAt: string;
  updatedAt: string;
}

const ContactPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      // Remplacer la simulation par un appel réel à l'API
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nom: data.name, // Assurez-vous que les noms de champs correspondent à ceux attendus par le backend
          email: data.email,
          sujet: data.subject,
          message: data.message,
          // Le champ 'telephone' est optionnel et n'est pas dans ce formulaire, donc il ne sera pas envoyé.
          // Le backend devrait le gérer comme undefined ou avec une valeur par défaut si configuré.
        }),
      });

      if (!response.ok) {
        // Essayer de lire le message d'erreur du backend s'il y en a un
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || `Erreur HTTP: ${response.status}`);
      }

      // Optionnel: utiliser la réponse de l'API si nécessaire
      // const responseData: ContactApiResponse = await response.json();
      // console.log("API Response:", responseData);

      await response.json(); // Consommer le corps de la réponse pour éviter les problèmes

      toast.success("Votre message a été envoyé avec succès !");
      form.reset();
    } catch (error: any) {
      toast.error(error.message || "Une erreur est survenue lors de l'envoi du message. Veuillez réessayer.");
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Contactez-nous</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Nous sommes à votre écoute ! N'hésitez pas à nous contacter pour toute question ou suggestion.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Informations de contact</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className="p-3 bg-primary/10 rounded-full mb-4">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Adresse</h3>
                    <p className="text-muted-foreground">
                      Avenue Mohammed V<br />
                      Sidi Bennour, Maroc
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className="p-3 bg-primary/10 rounded-full mb-4">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Téléphone</h3>
                    <p className="text-muted-foreground">
                      +212 5XX-XXXXXX<br />
                      +212 5XX-XXXXXX
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className="p-3 bg-primary/10 rounded-full mb-4">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Email</h3>
                    <p className="text-muted-foreground">
                      contact@sidibennour.ma<br />
                      info@sidibennour.ma
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className="p-3 bg-primary/10 rounded-full mb-4">
                      <Clock className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Horaires</h3>
                    <p className="text-muted-foreground">
                      Lun - Ven: 8h30 - 16h30<br />
                      Sam: 9h00 - 12h00
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="bg-muted p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <MessageSquare className="h-5 w-5 mr-2" />
                Comment pouvons-nous vous aider ?
              </h2>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Pour les questions concernant l'état civil, contactez-nous par téléphone.</li>
                <li>Pour les demandes de rendez-vous, précisez le service concerné dans votre message.</li>
                <li>Pour signaler un problème dans la commune, utilisez le sujet "Signalement".</li>
                <li>Pour les propositions d'amélioration, nous vous encourageons à partager vos idées !</li>
              </ul>
            </div>
          </div>

          <div>
            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-semibold mb-6">Envoyez-nous un message</h2>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nom</FormLabel>
                          <FormControl>
                            <Input placeholder="Votre nom" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="Votre adresse email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Sujet</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Sélectionnez un sujet" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="information">Demande d'information</SelectItem>
                              <SelectItem value="rdv">Demande de rendez-vous</SelectItem>
                              <SelectItem value="signalement">Signalement d'un problème</SelectItem>
                              <SelectItem value="suggestion">Suggestion ou proposition</SelectItem>
                              <SelectItem value="autre">Autre</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Votre message"
                              className="min-h-32"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? "Envoi en cours..." : "Envoyer le message"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* ✅ Carte Google Maps intégrée ici */}
        <div className="mt-12 h-96 rounded-lg overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26875.050416206217!2d-8.4502353634016!3d32.649295902614135!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xdaf28e15c89e487%3A0x274db028f84d4095!2sSidi%20Bennour!5e0!3m2!1sfr!2sma!4v1744645219933!5m2!1sfr!2sma"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
