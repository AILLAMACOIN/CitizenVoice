import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"

const ministries = [
  {
    name: "Ministry of Interior",
    departments: [
      "General Directorate of Residency and Foreigners Affairs",
      "Federal Traffic Council",
      "Civil Defense",
      "Anti-Narcotics Federal Directorate General",
      "Federal Criminal Police",
    ],
  },
  {
    name: "Ministry of Health and Prevention",
    departments: [
      "Public Health and Prevention",
      "Hospitals Sector",
      "Primary Health Care",
      "Medical Practices and Licenses",
      "Health Centers and Clinics",
    ],
  },
  {
    name: "Ministry of Education",
    departments: [
      "Higher Education",
      "General Education",
      "Curriculum and Assessment",
      "Educational Development",
      "Special Education",
    ],
  },
  {
    name: "Ministry of Economy",
    departments: [
      "Economic Affairs",
      "Foreign Trade",
      "Small and Medium Enterprises",
      "Industrial Affairs",
      "Investment and Projects",
    ],
  },
  {
    name: "Ministry of Climate Change and Environment",
    departments: ["Environmental Affairs", "Food Safety", "Biodiversity", "Waste Management", "Climate Change"],
  },
  {
    name: "Ministry of Energy and Infrastructure",
    departments: ["Electricity and Energy", "Water Resources", "Transportation", "Public Works", "Housing"],
  },
]

export default function DepartmentsPage() {
  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold text-gold mb-10">UAE Government Departments</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {ministries.map((ministry) => (
          <Card key={ministry.name}>
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gold">{ministry.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-4 space-y-1">
                {ministry.departments.map((dept) => (
                  <li key={dept} className="text-sm">
                    {dept}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
} 