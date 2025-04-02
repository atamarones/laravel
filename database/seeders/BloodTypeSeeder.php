namespace Database\Seeders;

use App\Models\BloodType;
use Illuminate\Database\Seeder;

class BloodTypeSeeder extends Seeder
{
    public function run(): void
    {
        $types = [
            ['name' => 'A+'],
            ['name' => 'A-'],
            ['name' => 'B+'],
            ['name' => 'B-'],
            ['name' => 'AB+'],
            ['name' => 'AB-'],
            ['name' => 'O+'],
            ['name' => 'O-'],
        ];

        foreach ($types as $type) {
            BloodType::create($type);
        }
    }
} 