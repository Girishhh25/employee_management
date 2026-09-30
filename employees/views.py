from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Employee, Department
from .serializers import EmployeeSerializer, DepartmentSerializer


@api_view(['GET', 'POST'])
def employee_list(request):

    if request.method == 'GET':
        employees = Employee.objects.all()
        serializer = EmployeeSerializer(employees, many=True)
        return Response(serializer.data)

    if request.method == 'POST':
        serializer = EmployeeSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=400)


@api_view(['GET', 'POST'])
def department_list(request):

    if request.method == 'GET':
        departments = Department.objects.all()
        serializer = DepartmentSerializer(departments, many=True)
        return Response(serializer.data)

    if request.method == 'POST':
        serializer = DepartmentSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=400)


@api_view(['GET', 'PUT', 'DELETE'])
def employee_detail(request, id):

    try:
        employee = Employee.objects.get(id=id)
    except Employee.DoesNotExist:
        return Response(
            {'error': 'Employee not found'},
            status=404
        )

    if request.method == 'GET':
        serializer = EmployeeSerializer(employee)
        return Response(serializer.data)

    if request.method == 'PUT':
        serializer = EmployeeSerializer(
            employee,
            data=request.data
        )

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=400)

    if request.method == 'DELETE':
        employee.delete()
        return Response(
            {'message': 'Employee deleted successfully'}
        )

@api_view(['GET', 'PUT', 'DELETE'])
def department_detail(request, id):

    try:
        department = Department.objects.get(id=id)
    except Department.DoesNotExist:
        return Response(
            {'error': 'Department not found'},
            status=404
        )

    if request.method == 'GET':
        serializer = DepartmentSerializer(department)
        return Response(serializer.data)

    if request.method == 'PUT':
        serializer = DepartmentSerializer(
            department,
            data=request.data
        )

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=400)

    if request.method == 'DELETE':
        department.delete()
        return Response({
            'message': 'Department deleted successfully'
        })   