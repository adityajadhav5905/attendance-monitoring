import pandas as pd
import random
import math

# Read CSV
df = pd.read_csv('db.csv')  # replace with your CSV file path

# Open file to save queries
with open('insert.sql', 'w') as f:

    for index, row in df.iterrows():
        roll_no = row['RollNo']
        student_name = row['StudentName'].replace("'", "''")  # escape single quotes
        batch = row['Batch']
        avg_percentage = row['Avg']

        subjects = ['dbm', 'mc', 'eft', 'dc', 'cn']
        
        # Step 1: Random total lectures per subject
        subject_lectures = {sub: random.randint(25, 30) for sub in subjects}
        total_lectures = sum(subject_lectures.values())

        # Step 2: Generate random distribution of present lectures
        # Start with random present counts for subjects
        temp_present = {sub: random.randint(0, subject_lectures[sub]) for sub in subjects}
        temp_total_present = sum(temp_present.values())

        # Step 3: Scale present counts to match total_percentage = Avg
        if temp_total_present == 0:
            scale_factor = avg_percentage / 100
        else:
            scale_factor = (avg_percentage / 100) * total_lectures / temp_total_present

        attendance_data = {}
        for sub in subjects:
            scaled_present = math.floor(temp_present[sub] * scale_factor)
            # Ensure present does not exceed total lectures
            scaled_present = min(scaled_present, subject_lectures[sub])
            absent = subject_lectures[sub] - scaled_present
            percentage = round((scaled_present / subject_lectures[sub]) * 100, 2)
            attendance_data[f'{sub}_present'] = scaled_present
            attendance_data[f'{sub}_absent'] = absent
            attendance_data[f'{sub}_percentage'] = percentage

        # Step 4: Calculate totals to exactly match Avg
        total_present = sum(attendance_data[f'{sub}_present'] for sub in subjects)
        total_absent = sum(attendance_data[f'{sub}_absent'] for sub in subjects)
        total_percentage = round((total_present / total_lectures) * 100, 2)

        # Adjust total_percentage to exactly match Avg by modifying the first subject
        diff = round(avg_percentage - total_percentage, 2)
        if diff != 0:
            sub = subjects[0]
            adjust = round(diff / 100 * total_lectures)
            new_present = attendance_data[f'{sub}_present'] + adjust
            # Boundaries check
            new_present = max(0, min(new_present, subject_lectures[sub]))
            attendance_data[f'{sub}_present'] = new_present
            attendance_data[f'{sub}_absent'] = subject_lectures[sub] - new_present
            attendance_data[f'{sub}_percentage'] = round((new_present / subject_lectures[sub]) * 100, 2)
            # Recalculate totals
            total_present = sum(attendance_data[f'{sub}_present'] for sub in subjects)
            total_absent = sum(attendance_data[f'{sub}_absent'] for sub in subjects)
            total_percentage = round((total_present / total_lectures) * 100, 2)

        # Step 5: Generate INSERT query
        query = f"""
INSERT INTO student_attendance_summary 
(roll_no, student_name, batch, 
dbm_present, dbm_absent, dbm_percentage, 
mc_present, mc_absent, mc_percentage, 
eft_present, eft_absent, eft_percentage, 
dc_present, dc_absent, dc_percentage, 
cn_present, cn_absent, cn_percentage, 
total_present, total_absent, total_percentage)
VALUES
('{roll_no}', '{student_name}', '{batch}',
{attendance_data['dbm_present']}, {attendance_data['dbm_absent']}, {attendance_data['dbm_percentage']},
{attendance_data['mc_present']}, {attendance_data['mc_absent']}, {attendance_data['mc_percentage']},
{attendance_data['eft_present']}, {attendance_data['eft_absent']}, {attendance_data['eft_percentage']},
{attendance_data['dc_present']}, {attendance_data['dc_absent']}, {attendance_data['dc_percentage']},
{attendance_data['cn_present']}, {attendance_data['cn_absent']}, {attendance_data['cn_percentage']},
{total_present}, {total_absent}, {avg_percentage}
);
"""
        f.write(query)

print("SQL queries saved to insert_attendance.sql")
