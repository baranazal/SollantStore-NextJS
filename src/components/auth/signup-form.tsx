'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuth } from '@/hooks/use-auth'
import { signUpSchema } from '@/lib/schemas'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Loader2 } from 'lucide-react'
import { toast } from 'react-hot-toast'
import { z } from 'zod'
import { Country, City, ICity } from 'country-state-city'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import ReactCountryFlag from "react-country-flag"
import palestineData from '@/data/palestine/palestineCities.json'

type SignUpFormValues = z.infer<typeof signUpSchema>

export default function SignupForm() {
  const router = useRouter()
  const { signUp } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [selectedCountry, setSelectedCountry] = useState<string>('PS')
  const [cities, setCities] = useState<ICity[]>(() => {
    // Initialize with Palestine cities
    const palestineCities = palestineData.cities.map(city => ({
      name: city.name,
      countryCode: 'PS',
      stateCode: '',
      latitude: '',
      longitude: ''
    }))
    return palestineCities
  })
  const [villages, setVillages] = useState<string[]>([])
  
  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      phone: '',
      country: 'PS',
      city: '',
      village: '',
      streetAddress: '',
      password: '',
      confirmPassword: '',
    },
  })

  const onSubmit = async (data: SignUpFormValues) => {
    try {
      setIsLoading(true)
      const signUpData = {
        ...data,
        // Ensure village is a string, even if empty
        village: data.country === 'PS' ? (data.village || '') : ''
      }
      await signUp(signUpData)
      router.push('/login?verification=pending')
    } catch (error) {
      toast.error('Something went wrong. Please try again.')
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  // Get countries list
  const countries = useMemo(() => {
    return Country.getAllCountries()
  }, [])

  // Update cities when country changes
  const handleCountryChange = (countryCode: string) => {
    setSelectedCountry(countryCode)
    if (countryCode === 'PS') {
      // Add required ICity properties
      const palestineCities = palestineData.cities.map(city => ({
        name: city.name,
        countryCode: 'PS',
        stateCode: '',
        latitude: '',
        longitude: ''
      }))
      setCities(palestineCities)
      form.setValue('city', '')
      form.setValue('village', '')
    } else {
      // Use country-state-city data for other countries
      const allCities = City.getCitiesOfCountry(countryCode) || []
      const uniqueCities = allCities.filter((city, index, self) =>
        index === self.findIndex((c) => c.name === city.name)
      )
      setCities(uniqueCities)
      setVillages([])
      form.setValue('city', '')
      form.setValue('village', '')
    }
  }

  const handleCityChange = (cityName: string) => {
    if (selectedCountry === 'PS') {
      const cityData = palestineData.cities.find(city => city.name === cityName)
      setVillages(cityData?.villages || [])
      form.setValue('village', '')
    }
  }

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="john.doe@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="+1234567890" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value)
                      handleCountryChange(value)
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a country" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="max-h-[296px]">
                      {countries.map((country) => (
                        <SelectItem 
                          key={country.isoCode} 
                          value={country.isoCode} 
                          className="flex items-center"
                        >
                          <ReactCountryFlag 
                            countryCode={country.isoCode} 
                            svg 
                            style={{
                              width: '1.2em',
                              height: '1.2em',
                              marginRight: '12px'
                            }}
                          />
                          {country.isoCode === 'PS' ? 'Palestine' : country.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value)
                      handleCityChange(value)
                    }}
                    defaultValue={field.value}
                    disabled={!selectedCountry}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a city" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="max-h-[296px] overflow-y-auto">
                      {cities.map((city) => (
                        <SelectItem 
                          key={city.name}
                          value={city.name}
                          className="cursor-pointer hover:bg-accent"
                        >
                          {city.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {selectedCountry === 'PS' && (
              <FormField
                control={form.control}
                name="village"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Village</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={!villages.length}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a village" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="max-h-[296px] overflow-y-auto">
                        {villages.map((village) => (
                          <SelectItem 
                            key={village}
                            value={village}
                            className="cursor-pointer hover:bg-accent"
                          >
                            {village}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="streetAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Street Address</FormLabel>
                  <FormControl>
                    <Input placeholder="123 Main St" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                'Create account'
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <span className="text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link href="/login" className="text-primary hover:underline">
            Login
          </Link>
        </span>
      </CardFooter>
    </Card>
  )
}